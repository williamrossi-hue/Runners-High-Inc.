import express, { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables from .env file
dotenv.config();

const PORT = 3000;
const HOST = "0.0.0.0";

// Helper for lazy server-side Gemini client initialization
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();

  // Security: Parse JSON body with strict length limit to mitigate payload bombs
  app.use(express.json({ limit: "100kb" }));

  // Security: Set basic security headers on responses
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  // Security: Strict Rate Limiting on API endpoints to prevent abuse & denial of service
  const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 20, // max 20 requests per minute per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: "Too many requests from this IP, please try again after a minute.",
      statusCode: 429,
    },
  });

  // Apply rate limiter to all /api routes
  app.use("/api/", apiLimiter);

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    const hasApiKey = Boolean(process.env.GEMINI_API_KEY);
    res.json({
      status: "ok",
      serverTime: new Date().toISOString(),
      security: {
        rateLimiterActive: true,
        apiKeyConfigured: hasApiKey,
        backendProxyOnly: true,
      },
    });
  });

  // Security: Input Validation Middleware
  const validatePrompt = (req: Request, res: Response, next: NextFunction) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Validation Error: 'prompt' must be a non-empty string.",
      });
    }

    const trimmed = prompt.trim();
    if (trimmed.length === 0) {
      return res.status(400).json({
        error: "Validation Error: Prompt cannot be blank or whitespace only.",
      });
    }

    if (trimmed.length > 2000) {
      return res.status(400).json({
        error: "Validation Error: Prompt exceeds maximum length of 2,000 characters.",
      });
    }

    // Attach validated prompt to request body
    req.body.validatedPrompt = trimmed;
    next();
  };

  // Backend Proxy Route for Gemini API Text Generation
  app.post("/api/gemini/generate", validatePrompt, async (req: Request, res: Response) => {
    try {
      const ai = getGeminiClient();
      const promptText = req.body.validatedPrompt;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: promptText,
      });

      const outputText = response.text || "No response text generated.";

      return res.json({
        success: true,
        text: outputText,
        promptLength: promptText.length,
      });
    } catch (err: any) {
      console.error("Error in /api/gemini/generate:", err);
      return res.status(500).json({
        error: "An error occurred while generating content.",
        message: err.message || "Failed to contact Gemini API securely.",
      });
    }
  });

  // Backend Proxy Route for Gemini API Streaming Text Generation
  app.post("/api/gemini/stream", validatePrompt, async (req: Request, res: Response) => {
    try {
      const ai = getGeminiClient();
      const promptText = req.body.validatedPrompt;

      // Set headers for Server-Sent Events (SSE)
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.6-flash",
        contents: promptText,
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (err: any) {
      console.error("Error in /api/gemini/stream:", err);
      if (!res.headersSent) {
        return res.status(500).json({
          error: "Streaming error occurred.",
          message: err.message || "Failed to stream from Gemini API.",
        });
      } else {
        res.write(`data: ${JSON.stringify({ error: err.message || "Stream interrupted" })}\n\n`);
        res.end();
      }
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Security Server] Express server listening on http://${HOST}:${PORT}`);
  });
}

startServer();
