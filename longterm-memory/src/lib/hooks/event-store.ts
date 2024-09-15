import { AgentEvent } from "@/interfaces";
import { useState } from "react";

export function useAgentEventStore() {
  const [events, setEvents] = useState<AgentEvent[]>([]);

  const addEvent = (event: AgentEvent) => {
    setEvents((events) => [...events, event]);
  };

  return { events, addEvent };
}
