import { Memory } from "@/interfaces";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export function useMemoryStore() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const storedMemories = localStorage.getItem("memories");
    if (storedMemories) {
      setMemories(JSON.parse(storedMemories));
    }
  }, [setMemories]);

  const deleteMemory = (index: number) => {
    const newMemories = memories.filter((_, i) => i !== index);
    localStorage.setItem("memories", JSON.stringify(newMemories));
    setMemories(newMemories);
  };

  const updateMemories = (memories: Memory[]) => {
    localStorage.setItem("memories", JSON.stringify(memories));
    setMemories(memories);
  };

  return { memories, deleteMemory, updateMemories };
}

export interface MemoryProps {
  memories: Memory[];
  deleteMemory: (index: number) => void;
}

export function Memories(props: MemoryProps) {
  const { memories, deleteMemory } = props;

  const renderMemory = (memory: Memory, index: number) => {
    return (
      <div key={index} className="flex justify-between items-center">
        <Badge>{memory.category}</Badge>
        <span className="text-sm">{memory.knowledge}</span>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" onClick={() => deleteMemory(index)} />
        </Button>
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
