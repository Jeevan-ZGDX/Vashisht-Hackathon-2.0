import {
  users, 
  hairTypes,
  concerns,
  products,
  routineSteps,
  routines,
  quizQuestions,
  educationalContent,
  type User,
  type InsertUser,
  type HairType,
  type Concern,
  type Product,
  type RoutineStep,
  type Routine,
  type InsertRoutine,
  type QuizQuestion,
  type EducationalContent
} from "@shared/schema";
import { db } from "./db";
import { and, eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Hair types methods
  getAllHairTypes(): Promise<HairType[]>;
  
  // Concerns methods
  getAllConcerns(): Promise<Concern[]>;
  
  // Products methods
  getProducts(filters?: any): Promise<Product[]>;
  
  // Routine steps methods
  getAllRoutineSteps(): Promise<RoutineStep[]>;
  
  // Routines methods
  getRoutinesByUserId(userId: number): Promise<Routine[]>;
  getRoutineById(id: number): Promise<Routine | undefined>;
  createRoutine(routine: InsertRoutine): Promise<Routine>;
  
  // Quiz questions methods
  getAllQuizQuestions(): Promise<QuizQuestion[]>;
  
  // Educational content methods
  getAllEducationalContent(): Promise<EducationalContent[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Hair types methods
  async getAllHairTypes(): Promise<HairType[]> {
    return await db.select().from(hairTypes);
  }
  
  // Concerns methods
  async getAllConcerns(): Promise<Concern[]> {
    return await db.select().from(concerns);
  }
  
  // Products methods
  async getProducts(filters?: any): Promise<Product[]> {
    // Implement filtering logic here if needed
    return await db.select().from(products);
  }
  
  // Routine steps methods
  async getAllRoutineSteps(): Promise<RoutineStep[]> {
    return await db.select().from(routineSteps);
  }
  
  // Routines methods
  async getRoutinesByUserId(userId: number): Promise<Routine[]> {
    return await db.select().from(routines).where(eq(routines.userId, userId));
  }
  
  async getRoutineById(id: number): Promise<Routine | undefined> {
    const [routine] = await db.select().from(routines).where(eq(routines.id, id));
    return routine;
  }
  
  async createRoutine(insertRoutine: InsertRoutine): Promise<Routine> {
    const [routine] = await db.insert(routines).values(insertRoutine).returning();
    return routine;
  }
  
  // Quiz questions methods
  async getAllQuizQuestions(): Promise<QuizQuestion[]> {
    return await db.select().from(quizQuestions);
  }
  
  // Educational content methods
  async getAllEducationalContent(): Promise<EducationalContent[]> {
    return await db.select().from(educationalContent);
  }
}

export const storage = new DatabaseStorage();
