import { Memory } from "@/interfaces";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

export interface MemoryProps {
  memories: Memory[];
  deleteMemory: (index: number) => void;
}

export function Memories(props: MemoryProps) {
  const { memories, deleteMemory } = props;

  const renderMemory = (memory: Memory, index: number) => {
    return (
      <div key={index} className="grid grid-cols-[75px_1fr_40px] gap-4">
        <div>
          <Badge>{memory.category}</Badge>
        </div>
        <div>
          <span className="text-sm">{memory.knowledge}</span>
        </div>
        <div>
          <Button variant="ghost" size="icon">
            <X className="h-4 w-4" onClick={() => deleteMemory(index)} />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="md:col-span-1 flex flex-col h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Long-Term Memories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 overflow-y-auto h-[calc(100vh-7rem)]">
          {memories.map(renderMemory)}
        </CardContent>
      </Card>
    </div>
  );
}
