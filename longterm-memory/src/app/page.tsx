"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MemoryExtraction } from "./memory-extraction";
import { Memories } from "./memories";
import { Chat } from "./chat";
import { useMemoryStore } from "@/lib/hooks/memory-store";
import { useAgentEventStore } from "@/lib/hooks/event-store";

export default function Component() {
  const { memories, deleteMemory, updateMemories } = useMemoryStore();
  const { events, addEvent } = useAgentEventStore();

  return (
    <div className="w-full h-screen bg-gray-100 p-0">
      <Card className="w-full h-full rounded-none">
        <CardContent className="p-4 h-[calc(100vh-5rem)]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
            <Chat
              memories={memories}
              setMemories={updateMemories}
              eventHandler={addEvent}
            />
            <MemoryExtraction events={events} />
            <Memories memories={memories} deleteMemory={deleteMemory} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
