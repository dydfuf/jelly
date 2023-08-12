import { create } from "zustand";
import { Memory } from "hooks/memory/useGetMemory";

interface MemoryState {
  memories: Memory[];
  addMemory: (memory: Memory) => void;
  deleteMemory: (memoryId: string) => void;
  initMemory: (memories: Memory[]) => void;
}

const useMemoryState = create<MemoryState>((set) => ({
  memories: [],
  addMemory: (memory) =>
    set((state) => ({
      memories: [...state.memories, memory],
    })),
  deleteMemory: (memoryId) =>
    set((state) => ({
      memories: state.memories.filter((memory) => memory.id !== memoryId),
    })),
  initMemory: (memories) => set(() => ({ memories })),
}));

export default useMemoryState;
