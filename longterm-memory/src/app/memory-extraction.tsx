import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MemoryAction {
  knowledge: string;
  action?: "CREATE" | "UPDATE" | "DELETE";
  category?: "ATTRIBUTE" | "ACTION";
}

interface Agent {
  name: string;
  messages: string[];
  memories: MemoryAction[];
}

export function MemoryExtraction() {
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

  const renderAgent = (agent: Agent, index: number) => {
    return (
      <div className="space-y-1" key={index}>
        <h4 className="font-semibold text-orange-500">{agent.name}</h4>
        {agent.messages.map((message, index) => (
          <p key={index} className="text-sm">
            {message}
          </p>
        ))}
        {agent.memories.map((memory, index) => (
          <p key={index} className="text-sm">
            {`Memory ${index + 1}: ${JSON.stringify(memory)}`}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="md:col-span-2 space-y-4 overflow-y-auto h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Memory Extraction Agent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">{agents.map(renderAgent)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
