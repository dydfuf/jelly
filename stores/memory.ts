import { create } from "zustand";
import { Memory } from "hooks/memory/useGetMemory";

interface MemoryState {
  memories: Memory[];
  addMemory: (memory: Memory) => void;
  initMemory: (memories: Memory[]) => void;
}

const useMemoryState = create<MemoryState>((set) => ({
  memories: [],
  addMemory: (memory) =>
    set((state) => ({
      memories: [...state.memories, memory],
    })),
  initMemory: (memories) => set(() => ({ memories })),
}));

export default useMemoryState;
