import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { createOpenAI as createOllama } from "@ai-sdk/openai";

export interface LLMChatMessage {
  text: string;
  sender:
    | "USER"
    | "ASSISTANT"
    | "SENTINEL"
    | "MEMORY_EXTRACTOR"
    | "MEMORY_REVIEWER"
    | "ACTION_ASSIGNER"
    | "CATEGORY_ASSIGNER";
}

export function getProvider() {
  if (process.env.LLM_PROVIDER === "groq") {
    return createGroq({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY,
    });
  } else {
    return createOllama({
      baseURL: "http://127.0.0.1:11434/v1",
      apiKey: "ollama",
    });
  }
}

export function getModelName() {
  if (process.env.LLM_PROVIDER === "groq") {
    return process.env.GROQ_MODEL!;
  } else {
    return process.env.LOCAL_MODEL!;
  }
}

export const getModel = () => getProvider()(getModelName());
