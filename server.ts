import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiInstance: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "La clave de API de Gemini (GEMINI_API_KEY) no está configurada. Por favor, agrégala en el panel de configuración (Settings > Secrets) de la plataforma."
      );
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/recommend-tool", async (req, res) => {
    try {
      const { query, tools } = req.body;
      
      const toolsContext = tools.map((t: any) => `- ${t.name}: ${t.description} (Use case: ${t.useCase})`).join("\n");
      
      const prompt = `You are an AI assistant helping a user choose the right AI tool from a specific list for their task.
Based on the following tools:
${toolsContext}

User task: "${query}"

Recommend the best tool(s) from the list for this task and explain why briefly. Keep the response concise, helpful, and in Spanish. If no tool is a perfect fit, suggest the closest one.`;

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      res.json({ recommendation: response.text });
    } catch (error: any) {
      console.error("Error generating recommendation:", error);
      let errorMessage = error.message || "No se pudo generar la recomendación";
      try {
        const parsed = JSON.parse(error.message);
        if (parsed.error && parsed.error.message) {
            errorMessage = parsed.error.message;
        }
      } catch (e) {}
      res.status(500).json({ error: errorMessage });
    }
  });

  app.post("/api/evaluate-prompt", async (req, res) => {
    try {
      const { promptText, sessionTitle, sessionGoal } = req.body;
      if (!promptText || typeof promptText !== "string") {
        return res.status(400).json({ error: "El texto del prompt es obligatorio." });
      }

      const ai = getAiClient();
      const evaluationPrompt = `Eres un Profesor Senior de Ingeniería de Prompts y Arquitectura de Datos evaluando el prompt de un alumno durante la sesión "${sessionTitle || 'IA Aplicada a Datos'}" (Objetivo: ${sessionGoal || 'Estructuración, ingesta, visualización o agentes en tiempo real'}).

Analiza el siguiente prompt escrito por el alumno:
"""
${promptText}
"""

Evalúa rigurosamente el prompt en 4 dimensiones (de 0 a 100 cada una):
1. rolContexto: ¿Define claramente el rol experto de la IA y el contexto empresarial/técnico?
2. claridadTarea: ¿Es específica la acción, los pasos a ejecutar y el objetivo analítico?
3. restriccionesReglas: ¿Incluye límites, manejo de errores, privacidad de datos (PII) o qué evitar?
4. formatoSalida: ¿Especifica la estructura exacta de salida (JSON, CSV, tabla Markdown, esquema de llaves)?

Devuelve un JSON estructurado con:
- overallScore (0 a 100)
- criteria: { rolContexto, claridadTarea, restriccionesReglas, formatoSalida }
- strengths: arreglo de 2 fortalezas concretas (en español)
- improvements: arreglo de 3 mejoras accionables y pedagógicas (en español)
- optimizedPrompt: una versión reescrita de nivel producción lista para copiar y pegar que incorpore las mejores prácticas para esta sesión.
- teacherTip: un consejo breve (1-2 oraciones) para comentar en vivo con la clase.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: evaluationPrompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallScore: { type: Type.INTEGER },
              criteria: {
                type: Type.OBJECT,
                properties: {
                  rolContexto: { type: Type.INTEGER },
                  claridadTarea: { type: Type.INTEGER },
                  restriccionesReglas: { type: Type.INTEGER },
                  formatoSalida: { type: Type.INTEGER },
                },
                required: ["rolContexto", "claridadTarea", "restriccionesReglas", "formatoSalida"],
              },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              improvements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              optimizedPrompt: { type: Type.STRING },
              teacherTip: { type: Type.STRING },
            },
            required: [
              "overallScore",
              "criteria",
              "strengths",
              "improvements",
              "optimizedPrompt",
              "teacherTip",
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json({ evaluation: parsed, source: "gemini" });
    } catch (error: any) {
      console.error("Error evaluating prompt with Gemini, returning fallback:", error);
      res.status(200).json({ evaluation: null, fallback: true });
    }
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const { topic } = req.body;
      
      const prompt = `Encuentra 3 recursos recientes, whitepapers o documentación oficial de alta calidad sobre el siguiente tema: "${topic}".
Proporciona la respuesta ESTRICTAMENTE en formato JSON como un arreglo de objetos. Cada objeto debe tener las siguientes claves:
- "title": El título del recurso.
- "url": La URL del recurso.
- "description": Una breve descripción de por qué es relevante.
NO incluyas texto fuera del JSON (ni markdown \`\`\`json).`;

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      let text = response.text || "[]";
      // Try to remove markdown block formatting if present
      text = text.replace(/^```json\s*/m, '').replace(/```$/m, '').trim();
      
      let resources = [];
      try {
        resources = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse JSON response:", text);
        resources = [];
      }

      res.json({ resources });
    } catch (error: any) {
      console.error("Error fetching resources:", error);
      let errorMessage = error.message || "No se pudieron obtener los recursos";
      try {
        const parsed = JSON.parse(error.message);
        if (parsed.error && parsed.error.message) {
            errorMessage = parsed.error.message;
        }
      } catch (e) {}
      res.status(500).json({ error: errorMessage });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
