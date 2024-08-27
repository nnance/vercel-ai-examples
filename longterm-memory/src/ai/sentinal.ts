import { LLMChatMessage } from "./llm";

export interface SentinalResult {
  containsInformation: boolean;
  confidence: number;
}

export function sentinalCheck(message: string): SentinalResult {
  return message.includes("vegetarian")
    ? {
        containsInformation: true,
        confidence: 1,
      }
    : {
        containsInformation: false,
        confidence: 1,
      };
}
