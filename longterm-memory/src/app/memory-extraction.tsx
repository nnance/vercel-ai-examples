import { AgentEvent } from "@/ai/assistant";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface MemoryExtractionProps {
  events: AgentEvent[];
}

export function MemoryExtraction(props: MemoryExtractionProps) {
  const { events } = props;

  const renderEvent = (
    { name, messages, actions }: AgentEvent,
    index: number
  ) => {
    return (
      <div className="space-y-1" key={index}>
        <h4 className="font-semibold text-orange-500">
          {name.replace(/_/g, " ")}
        </h4>
        {messages.map((message, index) => (
          <p key={index} className="text-sm">
            {message}
          </p>
        ))}
        {actions.map((memory, index) => (
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
          <div className="space-y-2">{events.map(renderEvent)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
