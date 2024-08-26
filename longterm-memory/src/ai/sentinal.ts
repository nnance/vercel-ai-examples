import { LLMChatMessage } from "./llm";

export interface SentinalResult {
  message: string;
  containsInformation: boolean;
  confidence: number;
}

export function sentinalCheck(message: string): SentinalResult {
  return message.includes("vegetarian")
    ? {
        message: "Message contains information.",
        containsInformation: true,
        confidence: 1,
      }
    : {
        message: "No information found.",
        containsInformation: false,
        confidence: 1,
      };
}
