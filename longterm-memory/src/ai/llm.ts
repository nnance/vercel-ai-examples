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

export function chatCompletion(message: LLMChatMessage): LLMChatMessage {
  return message.text.includes("vegetarian")
    ? {
        text: "Got it! So, you and your wife are both vegetarian. Now, do either of you have any allergies that I should be aware of?",
        sender: "ASSISTANT",
      }
    : { text: "Got it! Anything else I should know?", sender: "ASSISTANT" };
}
