import sqlite3
import re
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import GPT4AllEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain_community.llms import ollama

# Initialize Database
def init_db():
    conn = sqlite3.connect("db.sqlite")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS routines (
            id INTEGER PRIMARY KEY,
            email TEXT,
            routine TEXT,
            weekly_treatment TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Save Routine to DB
def save_routine(email, routine, weekly_treatment):
    conn = sqlite3.connect("db.sqlite")
    cursor = conn.cursor()

    # Clear previous routine for the same email (optional)
    cursor.execute("DELETE FROM routines WHERE email = ?", (email,))
    
    # Save new routine
    cursor.execute("INSERT INTO routines (email, routine, weekly_treatment) VALUES (?, ?, ?)", (email, routine, weekly_treatment))
    conn.commit()
    conn.close()
    print(f"Routine saved for {email}!")

# Load & Process Data
loader = TextLoader("data.txt.txt", encoding='UTF-8')
data = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
splits = text_splitter.split_documents(data)

vectorStore = Chroma.from_documents(documents=splits, embedding=GPT4AllEmbeddings())
llm = ollama.Ollama(model="llama3.2:latest")

qachain = RetrievalQA.from_chain_type(llm, retriever=vectorStore.as_retriever())

# Ask for Routine
def get_hair_routine(email, hair_type, scalp_condition, hair_goal):
    question = f"""
    USERS HAIR CONDITION:
    hair type : {hair_type}
    scalp condition: {scalp_condition}
    hair goal: {hair_goal}

    You are an AI hair care assistant providing personalized routines. Do not present information outside your vectordb. Present the routine in a clear, structured format:

    Hair Care Routine for [Hair Type/Condition]
    Hair Type: [e.g., Curly, Straight]
    Scalp Condition: [e.g., Oily, Dry]
    Key Concerns: [e.g., Frizz, Dandruff]
    
    Morning Routine:
    Cleanse: [Product] — [Usage + duration]
    Condition: [Product] — [Usage + duration]
    Protect: [Product] — [How to apply]
    
    Evening Routine:
    Scalp Treatment: [Product] — [Usage + duration]
    Overnight Care: [Product] — [Instructions]
    
    Weekly Treatments:
    Deep Conditioning: [Frequency] — [Product + usage]
    Protein Treatment: [Frequency] — [Product + usage]
    
    Tips: [Diet, lifestyle, cautionary notes]

    Keep the language friendly, concise, and informative.
    """
    result = qachain({"query": question})
    routine_text = result['result']

    # Extract weekly treatments using regex
    # Extract weekly treatments and everything after
    weekly_treatments_match = re.search(r'Weekly Treatments:(.*)', routine_text, re.DOTALL)

    # Get the matched text or set a fallback message
    treatment_text = weekly_treatments_match.group(1).strip() if weekly_treatments_match else "No weekly treatments found."

    print(treatment_text)
    print(routine_text)

    # Save to DB
    save_routine(email, routine_text, treatment_text)

    return routine_text

if __name__ == "__main__":
    init_db()
    email = "bobbyanderson2006@gmail.com"
    hair_type = "Coily"
    scalp_condition = "Dandruff"
    hair_goal = "Growth"

    routine = get_hair_routine(email, hair_type, scalp_condition, hair_goal)
    print("\nGenerated Hair Care Routine:\n")
    print(routine)
