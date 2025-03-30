import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import {
  insertUserSchema,
  insertRoutineSchema,
} from "@shared/schema";
import { z } from "zod";
import 'express-session';

// Extend express Request type to include session
declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  const apiRouter = express.Router();

  // Auth routes
  apiRouter.post("/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      
      req.session.userId = user.id;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  apiRouter.post("/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      
      // Don't return password in response
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to log in" });
    }
  });

  apiRouter.post("/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  // Hair Types
  apiRouter.get("/hair-types", async (req, res) => {
    try {
      const hairTypes = await storage.getAllHairTypes();
      res.json(hairTypes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hair types" });
    }
  });

  // Concerns
  apiRouter.get("/concerns", async (req, res) => {
    try {
      const concerns = await storage.getAllConcerns();
      res.json(concerns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch concerns" });
    }
  });

  // Products
  apiRouter.get("/products", async (req, res) => {
    try {
      const filters = req.query;
      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Quiz questions
  apiRouter.get("/quiz-questions", async (req, res) => {
    try {
      const quizQuestions = await storage.getAllQuizQuestions();
      res.json(quizQuestions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });

  // Routine steps
  apiRouter.get("/routine-steps", async (req, res) => {
    try {
      const routineSteps = await storage.getAllRoutineSteps();
      res.json(routineSteps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch routine steps" });
    }
  });

  // User Routines
  apiRouter.get("/routines", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const routines = await storage.getRoutinesByUserId(req.session.userId);
      res.json(routines);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch routines" });
    }
  });

  apiRouter.post("/routines", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const validatedData = insertRoutineSchema.parse({
        ...req.body,
        userId: req.session.userId
      });
      
      const routine = await storage.createRoutine(validatedData);
      res.status(201).json(routine);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Failed to create routine" });
    }
  });

  apiRouter.get("/routines/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const routineId = parseInt(req.params.id);
      const routine = await storage.getRoutineById(routineId);
      
      if (!routine) {
        return res.status(404).json({ message: "Routine not found" });
      }
      
      if (routine.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(routine);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch routine" });
    }
  });

  // Educational content
  apiRouter.get("/educational-content", async (req, res) => {
    try {
      const educationalContent = await storage.getAllEducationalContent();
      res.json(educationalContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch educational content" });
    }
  });

  // Mount API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
