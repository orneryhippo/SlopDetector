
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    score: {
      type: Type.INTEGER,
      description: 'A score from 0 (definitely human) to 100 (definitely AI slop).',
    },
    verdict: {
      type: Type.STRING,
      description: 'A short, snappy verdict, e.g., "High Probability of AI Slop", "Likely Human-Generated", "Mixed Signals".',
    },
    summary: {
      type: Type.STRING,
      description: 'A one-paragraph summary explaining the reasoning behind the score and verdict.',
    },
    positiveSigns: {
      type: Type.ARRAY,
      description: 'Bullet points of aspects that suggest human creation (e.g., original humor, personal anecdotes, complex editing).',
      items: { type: Type.STRING }
    },
    negativeSigns: {
      type: Type.ARRAY,
      description: 'Bullet points of aspects that suggest AI slop (e.g., robotic narration, generic script, repetitive visuals, factual errors).',
      items: { type: Type.STRING }
    }
  },
  required: ['score', 'verdict', 'summary', 'positiveSigns', 'negativeSigns']
};

export const detectSlop = async (url: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze this video URL for signs of being AI-generated "slop" content: ${url}`,
      config: {
        systemInstruction: `You are an 'AI Slop Detector' expert, a sophisticated tool designed to analyze video content for signs of being low-effort, mass-produced AI-generated content. You will be given a video URL. Since you cannot access external websites, you must base your analysis on common patterns associated with YouTube and TikTok videos from similar URLs or topics. Infer the likely content and style (e.g., 'a 10-minute history documentary,' 'a 30-second TikTok dance trend video,' 'a financial advice short'). Your analysis should be critical and detailed. Return your findings ONLY in the specified JSON format.`,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText) as AnalysisResult;
    return parsedResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze the URL. The model may have returned an invalid response.");
  }
};
