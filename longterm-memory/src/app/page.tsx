import { Card, CardContent } from "@/components/ui/card";
import { Agent, MemoryExtraction } from "./memory-extraction";
import { Memories, Memory } from "./memories";
import { Chat, ChatMessage } from "./chat";

const messages: ChatMessage[] = [
  { text: "My wife and I are vegetarian.", sender: "user" },
  {
    text: "Got it! So, you and your wife are both vegetarian. Now, do either of you have any allergies that I should be aware of?",
    sender: "chef",
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

export default function Component() {
  return (
    <div className="w-full h-screen bg-gray-100 p-0">
      <Card className="w-full h-full rounded-none">
        <CardContent className="p-4 h-[calc(100vh-5rem)]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
            <Chat messages={messages} />
            <MemoryExtraction agents={agents} />
            <Memories memories={memories} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
