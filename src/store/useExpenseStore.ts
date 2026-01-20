import { create } from "zustand";
import { Expense } from "../types/expense";
import * as expenseService from "../services/expenseService";
import { useUIStore } from "./useUIStore";

interface ExpenseState {
  expenses: Expense[];
  filteredExpenses: Expense[];
  filterCategory: string;
  fetchAllExpenses: () => Promise<void>;
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  filterByCategory: (category: string) => void;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  filteredExpenses: [],
  filterCategory: "All",

  fetchAllExpenses: async () => {
    const { setLoading, setError } = useUIStore.getState();
    setLoading(true);
    try {
      const data = await expenseService.fetchExpenses();
      set({ expenses: data, filteredExpenses: data });
      setLoading(false);
    } catch {
      setError("Failed to load expenses");
      setLoading(false);
    }
  },

  addExpense: async (expense) => {
    const { setLoading, setError } = useUIStore.getState();
    setLoading(true);
    try {
      const newExpense = await expenseService.addExpenseAPI(expense);
      set((state) => ({
        expenses: [...state.expenses, newExpense],
        filteredExpenses: [...state.filteredExpenses, newExpense],
      }));
      setLoading(false);
    } catch {
      setError("Failed to add expense");
      setLoading(false);
    }
  },

  deleteExpense: async (id) => {
    const { setLoading, setError } = useUIStore.getState();
    setLoading(true);
    try {
      await expenseService.deleteExpenseAPI(id);
      set((state) => ({
        expenses: state.expenses.filter((e) => e.id !== id),
        filteredExpenses: state.filteredExpenses.filter((e) => e.id !== id),
      }));
      setLoading(false);
    } catch {
      setError("Failed to delete expense");
      setLoading(false);
    }
  },

  updateExpense: async (updatedExpense) => {
    const { setLoading, setError } = useUIStore.getState();
    setLoading(true);
    try {
      const res = await expenseService.updateExpenseAPI(updatedExpense);
      set((state) => ({
        expenses: state.expenses.map((e) => (e.id === res.id ? res : e)),
        filteredExpenses: state.filteredExpenses.map((e) =>
          e.id === res.id ? res : e,
        ),
      }));
      setLoading(false);
    } catch {
      setError("Failed to update expense");
      setLoading(false);
    }
  },

  filterByCategory: (category) => {
    const allExpenses = get().expenses;
    const filtered =
      category === "All"
        ? allExpenses
        : allExpenses.filter((e) => e.category === category);
    set({ filteredExpenses: filtered, filterCategory: category });
  },
}));
