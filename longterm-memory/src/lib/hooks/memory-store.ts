import { Memory } from "@/interfaces";
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
