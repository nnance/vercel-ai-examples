import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface MemoryAction {
  knowledge: string;
  action?: "CREATE" | "UPDATE" | "DELETE";
  category?: "ATTRIBUTE" | "ACTION";
}

export interface Agent {
  name: string;
  messages: string[];
  memories: MemoryAction[];
}

export interface MemoryExtractionProps {
  agents: Agent[];
}

export function MemoryExtraction(props: MemoryExtractionProps) {
  const { agents } = props;

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
