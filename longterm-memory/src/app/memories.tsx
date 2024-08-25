import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export interface Memory {
  knowledge: string;
  category: "ATTRIBUTE" | "ACTION";
}

export interface MemoryProps {
  memories: Memory[];
}

export function Memories(props: MemoryProps) {
  const { memories } = props;

  const renderMemory = (memory: Memory, index: number) => {
    return (
      <div key={index} className="flex justify-between items-center">
        <Badge>{memory.category}</Badge>
        <span className="text-sm">{memory.knowledge}</span>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="md:col-span-1 overflow-y-auto h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Long-Term Memories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {memories.map(renderMemory)}
        </CardContent>
      </Card>
    </div>
  );
}
