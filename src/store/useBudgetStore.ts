import { create } from "zustand";

interface BudgetState {
  budget: number;
  setBudget: (amount: number) => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
  budget: 500,
  setBudget: (amount: number) => set({ budget: amount }),
}));
