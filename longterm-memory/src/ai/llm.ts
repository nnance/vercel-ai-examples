import { generateText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";

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
export async function chatCompletion(
  message: LLMChatMessage
): Promise<LLMChatMessage> {
  const groq = createGroq({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
  });

  const { text } = await generateText({
    model: groq("llama3-groq-70b-8192-tool-use-preview"),
    prompt: message.text,
  });

  return {
    text,
    sender: "ASSISTANT",
  };
}
