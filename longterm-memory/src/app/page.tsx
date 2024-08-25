"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Agent, MemoryExtraction } from "./memory-extraction";
import { Memories, Memory } from "./memories";
import { Chat, ChatMessage } from "./chat";
import { useState } from "react";

const messages: ChatMessage[] = [
  { text: "My wife and I are vegetarian.", sender: "USER" },
  {
    text: "Got it! So, you and your wife are both vegetarian. Now, do either of you have any allergies that I should be aware of?",
    sender: "CHEF",
  },
];

const agents: Agent[] = [
  {
    name: "Sentinel",
    messages: ["Message contains information."],
    memories: [],
  },
  {
    name: "Memory Extractor",
    messages: [
      'Memory extraction results from attempt #1: "Wife is a vegetarian", "I am a vegetarian"',
    ],
    memories: [
      { knowledge: "Wife is a vegetarian" },
      { knowledge: "I am a vegetarian" },
    ],
  },
  {
    name: "Memory Reviewer",
    messages: ["AI analysis is perfect."],
    memories: [],
  },
  {
    name: "Action Assigner",
    messages: [
      'Added actions: {"memories": [{"knowledge": "I am a vegetarian", "action": "CREATE"}, {"knowledge": "Wife is a vegetarian", "action": "CREATE"}]',
    ],
    memories: [
      { knowledge: "I am a vegetarian", action: "CREATE" },
      { knowledge: "Wife is a vegetarian", action: "CREATE" },
    ],
  },
  {
    name: "Category Assigner",
    messages: [
      'Added categories: {"memories": [{"knowledge": "I am a vegetarian", "category": "ATTRIBUTE", "action": "CREATE"}, {"knowledge": "Wife is a vegetarian", "category": "ATTRIBUTE", "action": "CREATE"}]',
    ],
    memories: [
      {
        knowledge: "I am a vegetarian",
        category: "ATTRIBUTE",
        action: "CREATE",
      },
      {
        knowledge: "Wife is a vegetarian",
        category: "ATTRIBUTE",
        action: "CREATE",
      },
    ],
  },
];

const memories: Memory[] = [
  { knowledge: "I am a vegetarian", category: "ATTRIBUTE" },
  { knowledge: "Wife is a vegetarian", category: "ATTRIBUTE" },
];

interface State {
  messages: ChatMessage[];
  agents: Agent[];
  memories: Memory[];
}

const defaultState: State = {
  messages,
  agents,
  memories,
};

export default function Component() {
  const [{ messages, memories, agents }, setState] =
    useState<State>(defaultState);

  const deleteMemory = (index: number) => {
    const newMemories = memories.filter((_, i) => i !== index);
    setState((state) => ({ ...state, memories: newMemories }));
  };

  const sendMessage = (message: ChatMessage) => {
    setState((state) => ({ ...state, messages: [...state.messages, message] }));
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-0">
      <Card className="w-full h-full rounded-none">
        <CardContent className="p-4 h-[calc(100vh-5rem)]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
            <Chat messages={messages} sendMessage={sendMessage} />
            <MemoryExtraction agents={agents} />
            <Memories memories={memories} deleteMemory={deleteMemory} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
