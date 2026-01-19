import { create } from "zustand";
import { Expense } from "../types/expense";
import * as expenseService from "../services/expenseService";

interface ExpenseState {
  expenses: Expense[];
  filteredExpenses: Expense[];
  filterCategory: string;
  fetchAllExpenses: () => Promise<void>;
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
  filterByCategory: (category: string) => void;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  filteredExpenses: [],
  filterCategory: "All",

  fetchAllExpenses: async () => {
    const data = await expenseService.fetchExpenses();
    set({ expenses: data, filteredExpenses: data });
  },

  addExpense: async (expense) => {
    const newExpense = await expenseService.addExpenseAPI(expense);
    set((state) => ({
      expenses: [...state.expenses, newExpense],
      filteredExpenses: [...state.filteredExpenses, newExpense],
    }));
  },

  deleteExpense: async (id) => {
    await expenseService.deleteExpenseAPI(id);
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
      filteredExpenses: state.filteredExpenses.filter((e) => e.id !== id),
    }));
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
