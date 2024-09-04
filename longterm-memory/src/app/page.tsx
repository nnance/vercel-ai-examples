"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MemoryExtraction } from "./memory-extraction";
import { Memories } from "./memories";
import { Chat } from "./chat";
import { useState } from "react";
import { AgentEvent, Memory } from "@/interfaces";

export default function Component() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [events, setEvents] = useState<AgentEvent[]>([]);

  const deleteMemory = (index: number) => {
    const newMemories = memories.filter((_, i) => i !== index);
    setMemories(newMemories);
  };

  const handleAgentEvent = (event: AgentEvent) => {
    setEvents((events) => [...events, event]);
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-0">
      <Card className="w-full h-full rounded-none">
        <CardContent className="p-4 h-[calc(100vh-5rem)]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
            <Chat setMemories={setMemories} eventHandler={handleAgentEvent} />
            <MemoryExtraction events={events} />
            <Memories memories={memories} deleteMemory={deleteMemory} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
