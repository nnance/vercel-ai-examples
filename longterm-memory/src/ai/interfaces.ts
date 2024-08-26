export interface AgentEvent {
  name:
    | "USER"
    | "ASSISTANT"
    | "SENTINEL"
    | "MEMORY_EXTRACTOR"
    | "MEMORY_REVIEWER"
    | "ACTION_ASSIGNER"
    | "CATEGORY_ASSIGNER";
  messages: string[];
  actions: MemoryAction[];
}

export interface MemoryAction {
  knowledge: string;
  action?: "CREATE" | "UPDATE" | "DELETE";
  category?: "ATTRIBUTE" | "ACTION";
}
