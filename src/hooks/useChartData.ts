import { Expense } from "../types/expense";

export const useChartData = (expenses: Expense[]) => {
  const categories = ["Food", "Transport", "Entertainment", "Other"];
  return categories.map((cat) => ({
    category: cat,
    amount: expenses
      .filter((e) => e.category === cat)
      .reduce((acc, e) => acc + e.amount, 0),
  }));
};
