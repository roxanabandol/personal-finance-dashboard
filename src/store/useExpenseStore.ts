import { create } from "zustand";
import { Expense } from "../types/expense";
import { useUIStore } from "./useUIStore";
import {
  subscribeToExpenses,
  addExpenseAPI,
  deleteExpenseAPI,
  updateExpenseAPI,
} from "../services/expenseService";

interface ExpenseState {
  expenses: Expense[];
  filteredExpenses: Expense[];
  filterCategory: string;
  fetchAllExpenses: () => void;
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  filterByCategory: (category: string) => void;
  startRealtimeSync: () => void;
  stopRealtimeSync: () => void;
}

let unsubscribe: (() => void) | null = null;

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  filteredExpenses: [],
  filterCategory: "All",

  addExpense: async (expense) => {
    const { setError, setLoading } = useUIStore.getState();
    setLoading(true);
    try {
      await addExpenseAPI(expense);
    } catch {
      setError("Failed to add expense");
    } finally {
      setLoading(false);
    }
  },

  deleteExpense: async (id) => {
    const { setError, setLoading } = useUIStore.getState();
    setLoading(true);
    try {
      await deleteExpenseAPI(id);
    } catch {
      setError("Failed to delete expense");
    } finally {
      setLoading(false);
    }
  },

  updateExpense: async (expense) => {
    const { setError, setLoading } = useUIStore.getState();
    setLoading(true);
    try {
      await updateExpenseAPI(expense);
    } catch {
      setError("Failed to update expense");
    } finally {
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

  startRealtimeSync: () => {
    const { setError, setLoading } = useUIStore.getState();

    // dacă avem deja subscripție, nu facem nimic
    if (unsubscribe) return;

    setLoading(true); // loading doar prima dată

    unsubscribe = subscribeToExpenses(
      (expenses) => {
        const { filterCategory } = get();
        const filtered =
          filterCategory === "All"
            ? expenses
            : expenses.filter((e) => e.category === filterCategory);

        set({ expenses, filteredExpenses: filtered });

        setLoading(false); // loading oprim după ce primele date vin
      },
      (errorMsg) => {
        setError(errorMsg);
        setLoading(false);
      },
    );
  },

  stopRealtimeSync: () => {
    unsubscribe?.();
    unsubscribe = null;
  },

  fetchAllExpenses: () => {
    get().startRealtimeSync();
  },
}));
