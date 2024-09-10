import { AgentEvent, MemoryAction } from "@/interfaces";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";

export function useAgentEventStore() {
  const [events, setEvents] = useState<AgentEvent[]>([]);

  const addEvent = (event: AgentEvent) => {
    setEvents((events) => [...events, event]);
  };

  return { events, addEvent };
}

export interface MemoryExtractionProps {
  events: AgentEvent[];
}

function renderSentinelMessage(containsInformation: boolean) {
  if (containsInformation) {
    return "Message contains information.";
  } else {
    return "No information found.";
  }
}

function memoryExtractionMessage(actions: MemoryAction[]) {
  const memories = actions.reduce((acc, memory, idx) => {
    return idx < actions.length - 1
      ? acc + `"${memory.knowledge}", `
      : acc + `"${memory.knowledge}"`;
  }, "");
  return `Memory extraction results from attempt #1: ${memories}`;
}

function memoryReviewMessage({
  extractionSuccessful,
  description,
}: AgentEvent) {
  return extractionSuccessful
    ? "Memory extraction successful."
    : `Memory extraction failed.\n  ${description}`;
}

function memoryActionAssignerMessage(actions: MemoryAction[]) {
  return "Added actions: " + JSON.stringify(actions);
}

function memoryCategoryAssignerMessage(actions: MemoryAction[]) {
  return "Added categories: " + JSON.stringify(actions);
}

// a function that checks the type of the event and renders the appropriate message
export function renderEventMessage(event: AgentEvent) {
  if (event.name === "SENTINEL") {
    return renderSentinelMessage(event.containsInformation);
  } else if (event.name === "MEMORY_EXTRACTOR") {
    return memoryExtractionMessage(event.actions);
  } else if (event.name === "MEMORY_REVIEWER") {
    return memoryReviewMessage(event);
  } else if (event.name === "ACTION_ASSIGNER") {
    return memoryActionAssignerMessage(event.actions);
  } else if (event.name === "CATEGORY_ASSIGNER") {
    return memoryCategoryAssignerMessage(event.actions);
  }
}

export function MemoryExtraction(props: MemoryExtractionProps) {
  const { events } = props;

  const renderEvent = (event: AgentEvent, index: number) => {
    return (
      <div className="space-y-1" key={index}>
        <h4 className="font-semibold text-orange-500">
          {event.name.replace(/_/g, " ")}
        </h4>
        <p key={index} className="text-sm">
          {renderEventMessage(event)}
        </p>
        {event.actions.map((memory, index) => (
          <p key={index} className="text-sm text-gray-500">
            {`Memory ${index + 1}: ${JSON.stringify(memory)}`}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="md:col-span-2 space-y-4 flex flex-col h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Memory Extraction Agent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2 overflow-y-auto h-[calc(100vh-8.5rem)]">
            {events.map(renderEvent)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
