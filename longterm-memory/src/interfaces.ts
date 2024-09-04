export interface AgentEvent {
  name:
    | "USER"
    | "ASSISTANT"
    | "SENTINEL"
    | "MEMORY_EXTRACTOR"
    | "MEMORY_REVIEWER"
    | "ACTION_ASSIGNER"
    | "CATEGORY_ASSIGNER";
  containsInformation: boolean;
  extractionSuccessful: boolean;
  actions: MemoryAction[];
  description?: string;
}

export interface Knowledge {
  knowledge: string;
}

export interface Memory extends Knowledge {
  category: "ALLERGY" | "LIKE" | "DISLIKE" | "ATTRIBUTE";
}

export interface MemoryAction extends Knowledge {
  action?: "CREATE" | "UPDATE" | "DELETE";
  category?: Memory["category"];
  index?: number;
}

export interface MemoryReview {
  is_perfect: boolean;
  criticism: string;
}
