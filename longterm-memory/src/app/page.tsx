"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MemoryExtraction } from "./memory-extraction";
import { Memories, Memory } from "./memories";
import { Chat, ChatMessage } from "./chat";
import { useState } from "react";
import { AgentEvent, cookingAssistant } from "@/ai/assistant";

const memories: Memory[] = [
  { knowledge: "I am a vegetarian", category: "ATTRIBUTE" },
  { knowledge: "Wife is a vegetarian", category: "ATTRIBUTE" },
];

interface State {
  messages: ChatMessage[];
  memories: Memory[];
}

const defaultState: State = {
  messages: [],
  memories,
};

export default function Component() {
  const [{ messages, memories }, setState] = useState<State>(defaultState);

  const [events, setEvents] = useState<AgentEvent[]>([]);

  const addMemory = (memory: Memory) => {
    setState((state) => ({ ...state, memories: [...state.memories, memory] }));
  };

  const deleteMemory = (index: number) => {
    const newMemories = memories.filter((_, i) => i !== index);
    setState((state) => ({ ...state, memories: newMemories }));
  };

  const sendMessage = (message: ChatMessage) => {
    setState((state) => ({ ...state, messages: [...state.messages, message] }));
    cookingAssistant(message.text, (event) => {
      if (event.name === "ASSISTANT") {
        const newMessage: ChatMessage = {
          text: event.messages[0],
          sender: "CHEF",
        };
        setState((state) => ({
          ...state,
          messages: [...state.messages, newMessage],
        }));
      } else {
        setEvents((events) => [...events, event]);
      }
    });
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
