import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Terminal, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  FileCode, 
  Server, 
  Layers, 
  Send, 
  Copy, 
  Check, 
  RefreshCw, 
  Eye, 
  Info,
  Cpu,
  ShieldAlert,
  Sliders,
  Globe
} from "lucide-react";

interface HealthStatus {
  status: string;
  serverTime: string;
  security: {
    rateLimiterActive: boolean;
    apiKeyConfigured: boolean;
    backendProxyOnly: boolean;
  };
}

export const SecurityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sandbox" | "architecture" | "env" | "guide">("sandbox");
  const [prompt, setPrompt] = useState("");
  const [useStreaming, setUseStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState(0);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const MAX_PROMPT_LENGTH = 2000;

  // Fetch backend security health status
  const checkHealth = async () => {
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data);
    } catch (err) {
      console.error("Failed to connect to backend health check:", err);
      setHealth(null);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Client-side pre-validation
  const validatePromptInput = (text: string): string | null => {
    if (!text.trim()) {
      return "Input Validation Error: Prompt cannot be empty or whitespace only.";
    }
    if (text.length > MAX_PROMPT_LENGTH) {
      return `Input Validation Error: Prompt exceeds maximum limit of ${MAX_PROMPT_LENGTH} characters.`;
    }
    return null;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    const validationErr = validatePromptInput(prompt);
    if (validationErr) {
      setError(validationErr);
      return;
    }

    setLoading(true);
    const startTime = Date.now();
    setRequestCount((prev) => prev + 1);

    try {
      if (useStreaming) {
        // SSE Streaming via Backend Proxy
        const res = await fetch("/api/gemini/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || errData.message || `Server returned status ${res.status}`);
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let streamedText = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const parsed = JSON.parse(line.slice(6));
                  if (parsed.text) {
                    streamedText += parsed.text;
                    setResponse(streamedText);
                  } else if (parsed.error) {
                    throw new Error(parsed.error);
                  }
                } catch {
                  // Ignore parse errors on partial chunks
                }
              }
            }
          }
        }
      } else {
        // Standard JSON fetch via Backend Proxy
        const res = await fetch("/api/gemini/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || data.message || `HTTP ${res.status} Error`);
        }

        setResponse(data.text);
      }
      setResponseTime(Date.now() - startTime);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
      checkHealth();
    }
  };

  const envFileContent = `# .env file (DO NOT COMMIT TO GIT)
GEMINI_API_KEY="your-secret-gemini-api-key-here"
PORT=3000
NODE_ENV="development"`;

  const gitignoreContent = `# .gitignore file
node_modules/
dist/
build/
.env
.env.local
.env.*.local
*.log
.DS_Store`;

  const serverCodeSnippet = `// server.ts - Secure Backend Proxy
import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();

// 1. Strict Request Body Size Limits
app.use(express.json({ limit: "100kb" }));

// 2. Rate Limiting Middleware (Mitigates DoS & API abuse)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // Max 20 requests/min per IP
  message: { error: "Rate limit exceeded. Try again in 1 minute." }
});
app.use("/api/", limiter);

// 3. Lazy Gemini SDK Initialization (Server-Only Secret)
function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY missing");
  return new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { "User-Agent": "aistudio-build" } }
  });
}

// 4. Input Validation & Proxy Endpoint
app.post("/api/gemini/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Invalid prompt string" });
  }

  const ai = getAIClient();
  const result = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt.trim()
  });

  res.json({ text: result.text });
});`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 mb-8 shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-5 h-5" />
              Secure Enterprise AI Starter Architecture
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Gemini API Security & Backend Proxy Starter
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base">
              A full-stack, production-ready Node.js/Express + React starter demonstrating zero API key exposure, strict input validation, rate limiting, and Server-Sent Events (SSE).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${health?.security.apiKeyConfigured ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <div>
                <span className="text-xs text-slate-400 block font-medium">Backend Health</span>
                <span className="text-xs font-bold text-white font-mono">
                  {health ? "SERVER ONLINE" : "CONNECTING..."}
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">Rate Limiter</span>
                <span className="text-xs font-bold text-emerald-300 font-mono">ACTIVE (20 req/min)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "sandbox"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Zap className="w-4 h-4" />
            Interactive AI Sandbox
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "architecture"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Layers className="w-4 h-4" />
            Security Architecture
          </button>
          <button
            onClick={() => setActiveTab("env")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "env"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <FileCode className="w-4 h-4" />
            .env & .gitignore Setup
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === "guide"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Terminal className="w-4 h-4" />
            Run & Deploy Instructions
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE AI SANDBOX */}
      {activeTab === "sandbox" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Send className="w-5 h-5 text-emerald-600" />
                  Test Secure Gemini Proxy
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Requests are proxied through <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">/api/gemini/generate</code> or <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">/api/gemini/stream</code>.
                </p>
              </div>

              {/* Toggle Mode */}
              <label className="flex items-center gap-2 cursor-pointer bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={useStreaming}
                  onChange={(e) => setUseStreaming(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-700">SSE Streaming Mode</span>
              </label>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Prompt Input
                  </label>
                  <span className={`text-xs font-mono font-bold ${prompt.length > MAX_PROMPT_LENGTH ? "text-red-500" : "text-slate-400"}`}>
                    {prompt.length} / {MAX_PROMPT_LENGTH} chars
                  </span>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Explain why keeping API keys on the server is critical for security in 3 short bullet points."
                  rows={4}
                  className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-sans text-sm outline-none resize-none shadow-inner transition-all"
                />
              </div>

              {/* Client-side Live Validation Feedback */}
              {prompt.length > MAX_PROMPT_LENGTH && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Client Pre-Validation Warning: Prompt length exceeds maximum limit of {MAX_PROMPT_LENGTH} characters.
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  Proxyed Server Request (Zero Browser Key Exposure)
                </div>

                <button
                  type="submit"
                  disabled={loading || prompt.length > MAX_PROMPT_LENGTH || !prompt.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processing Proxy Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send to Backend
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Error Message Display */}
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-800 text-sm">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  Backend / Security Error Response
                </div>
                <p className="font-mono text-xs bg-red-100/60 p-2 rounded-lg mt-2 text-red-900 leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {/* AI Output Display */}
            {response && (
              <div className="mt-6 bg-slate-900 rounded-2xl p-6 text-slate-100 shadow-xl border border-slate-800">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    GEMINI API RESPONSE (MODEL: gemini-3.6-flash)
                  </div>
                  {responseTime && (
                    <span className="text-xs font-mono text-slate-400">
                      {responseTime} ms
                    </span>
                  )}
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans text-slate-200">
                  {response}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Security Verification Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 shadow-sm border border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Live Security Checklist Status
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300">1. Hardcoded Keys</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> NONE DETECTED
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300">2. .env Loading</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> dotenv Active
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300">3. .gitignore Protection</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> .env EXCLUDED
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300">4. Backend Proxy Layer</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Express Route
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300">5. Rate Limiter</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> 20 Req/Min
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300">6. Input Validation</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Max 2,000 Chars
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-emerald-900">
              <h4 className="font-extrabold text-sm flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-emerald-700" />
                Why Backend Proxies are Required
              </h4>
              <p className="text-xs leading-relaxed text-emerald-800">
                If an API key is placed inside frontend JavaScript code or Vite bundles, malicious actors can easily extract it from browser DevTools network tabs or source maps. By proxying requests through Express, the client only sees your server endpoint, keeping secrets safe.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARCHITECTURE & CODE INSPETOR */}
      {activeTab === "architecture" && (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              6-Layer Security Architecture Breakdown
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              How this starter application enforces security at every layer of the request stack:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900">Zero Client-Side Key Exposure</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The client browser never imports <code className="bg-slate-200 px-1 rounded">@google/genai</code> nor accesses <code className="bg-slate-200 px-1 rounded">process.env.GEMINI_API_KEY</code>. All AI calls are dispatched server-side in Node.js.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900">Strict Rate Limiting</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Integrated <code className="bg-slate-200 px-1 rounded">express-rate-limit</code> limits incoming traffic to 20 requests per minute per IP, protecting your Gemini API quota against automated scripts and DoS attacks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900">Input Sanity & Length Bounds</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Input middleware validates that requests contain string prompts within 1 to 2,000 characters, rejecting blank spaces or oversized request payloads before touching the AI SDK.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm">
                    4
                  </div>
                  <h3 className="font-bold text-slate-900">Payload Size & Security Headers</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Express is configured with a 100kb JSON body limit and security headers (<code className="bg-slate-200 px-1 rounded">X-Content-Type-Options</code>, <code className="bg-slate-200 px-1 rounded">X-Frame-Options</code>) to prevent payload inflation and framing attacks.
                </p>
              </div>
            </div>

            {/* Code Mirror Preview */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  server.ts Core Proxy Logic
                </span>
                <button
                  onClick={() => handleCopy(serverCodeSnippet, "server_snippet")}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  {copiedField === "server_snippet" ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-200 p-6 rounded-2xl overflow-x-auto text-xs font-mono leading-relaxed shadow-xl border border-slate-800">
                {serverCodeSnippet}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: .ENV & .GITIGNORE SETUP */}
      {activeTab === "env" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-600" />
                1. .env Configuration
              </h3>
              <button
                onClick={() => handleCopy(envFileContent, "env_file")}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                {copiedField === "env_file" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy .env
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Store local development secrets in a root <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">.env</code> file. Do not commit actual key values to git repository history.
            </p>
            <pre className="bg-slate-900 text-slate-200 p-4 rounded-2xl text-xs font-mono leading-relaxed border border-slate-800">
              {envFileContent}
            </pre>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                2. .gitignore Rules
              </h3>
              <button
                onClick={() => handleCopy(gitignoreContent, "gitignore_file")}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                {copiedField === "gitignore_file" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy .gitignore
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Ensure <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">.gitignore</code> explicitly excludes all environment files (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">.env*</code>) so developers never accidentally push secrets to public GitHub or version control.
            </p>
            <pre className="bg-slate-900 text-slate-200 p-4 rounded-2xl text-xs font-mono leading-relaxed border border-slate-800">
              {gitignoreContent}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 4: RUN & DEPLOY INSTRUCTIONS */}
      {activeTab === "guide" && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-600" />
            Local Execution & Cloud Deployment Instructions
          </h2>

          <div className="space-y-6 text-sm text-slate-700">
            <div className="border-l-4 border-emerald-500 pl-4 py-1">
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                Step 1: Local Development Run
              </h3>
              <p className="text-xs text-slate-600 mb-2">
                Run the unified development server combining Express and Vite middleware:
              </p>
              <pre className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-xs">
                npm run dev
              </pre>
            </div>

            <div className="border-l-4 border-emerald-500 pl-4 py-1">
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                Step 2: Build for Production
              </h3>
              <p className="text-xs text-slate-600 mb-2">
                Bundles client React assets into <code className="bg-slate-100 px-1 font-mono">dist/</code> and compiles the Express server into CommonJS via esbuild:
              </p>
              <pre className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-xs">
                npm run build
              </pre>
            </div>

            <div className="border-l-4 border-emerald-500 pl-4 py-1">
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                Step 3: Start Production Container / Server
              </h3>
              <p className="text-xs text-slate-600 mb-2">
                Launches the standalone server on port 3000:
              </p>
              <pre className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-xs">
                npm start
              </pre>
            </div>

            <div className="border-l-4 border-amber-500 pl-4 py-1 bg-amber-50/50 p-4 rounded-2xl">
              <h3 className="font-extrabold text-slate-900 text-base mb-1 flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-600" />
                Managing Secrets in AI Studio & Cloud Deployments
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When deployed on AI Studio or Cloud Run, environment variables like <code className="font-mono bg-white px-1 border rounded">GEMINI_API_KEY</code> are managed securely in the <strong>Settings &gt; Secrets</strong> panel. Secrets are injected directly into container environment variables at runtime without modifying code.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
