Hair Care AI Assistant

This project is an AI-driven hair care assistant that generates personalized hair care routines based on user input. The system stores user data in an SQLite database, retrieves relevant information, and generates a structured routine using an AI model.

Requirements

Ensure you have the following dependencies installed before running the program:

Python Libraries (Install using pip):

pip install sqlite3 langchain-community chromadb ollama

Ollama Installation:

Download and install Ollama from https://ollama.com

Llama 3.2 Model Installation:

Once Ollama is installed, run the following command in your terminal to install the model:

ollama pull llama3.2:latest

Setup & Execution

Follow these steps in order to properly run the project:

Launch the Web Form:

Open a terminal and navigate to the project directory.

Start a local server and launch the form by running form.js. You may use Node.js for this purpose.

Fill in the Form:

Open the form in a browser and enter your email, hair type, scalp condition, and hair goals.

Submit the form. The data will be stored in user_input.sqlite under the INPUT table.

Run the Main Program:

Execute main.py in your terminal:

python main.py

The program will fetch user input from user_input.sqlite, process the data, and generate a personalized hair care routine.

View the Output:

The generated routine will be displayed in the terminal.

The data will also be saved in db.sqlite for future reference.

Additional Notes

Ensure user_input.sqlite is correctly populated before running main.py.

If you encounter any errors related to missing dependencies, recheck the installation steps.

Modify form.js as needed to match the expected database schema.

Enjoy using the AI Hair Care Assistant! 