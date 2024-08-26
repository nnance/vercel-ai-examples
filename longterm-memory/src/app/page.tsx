"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MemoryExtraction } from "./memory-extraction";
import { Memories, Memory } from "./memories";
import { Chat, ChatMessage } from "./chat";
import { useState } from "react";
import { cookingAssistant } from "@/ai/assistant";
import { AgentEvent, MemoryAction } from "@/ai/interfaces";

export default function Component() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [events, setEvents] = useState<AgentEvent[]>([]);

  const deleteMemory = (index: number) => {
    const newMemories = memories.filter((_, i) => i !== index);
    setMemories(newMemories);
  };

  const handleAgentEvent = (event: AgentEvent) => {
    if (event.name === "ASSISTANT") {
      const newMessage: ChatMessage = {
        text: event.messages[0],
        sender: "CHEF",
      };
      setMessages((messages) => [...messages, newMessage]);
    } else {
      setEvents((events) => [...events, event]);
    }
  };

  const handleMemoryExtraction = (action: MemoryAction) => {
    const memory: Memory = {
      knowledge: action.knowledge,
      category: action.category!,
    };

    if (action.action === "DELETE") {
      deleteMemory(memories.findIndex((m) => m.knowledge === action.knowledge));
    } else {
      setMemories((memories) => [...memories, memory]);
    }
  };

  const sendMessage = (message: ChatMessage) => {
    setMessages((messages) => [...messages, message]);
    cookingAssistant(message.text, handleAgentEvent, handleMemoryExtraction);
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-0">
      <Card className="w-full h-full rounded-none">
        <CardContent className="p-4 h-[calc(100vh-5rem)]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
            <Chat messages={messages} sendMessage={sendMessage} />
            <MemoryExtraction events={events} />
            <Memories memories={memories} deleteMemory={deleteMemory} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
