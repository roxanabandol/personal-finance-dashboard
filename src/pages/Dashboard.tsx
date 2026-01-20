import { useEffect, useRef } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { useUIStore } from "../store/useUIStore";
import { useBudgetStore } from "../store/useBudgetStore";
import { Card } from "../components/Card";
import { ExpenseChart } from "../components/ExpenseChart";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const { filteredExpenses, filterCategory, filterByCategory } =
    useExpenseStore();
  const { loading, error } = useUIStore();
  const { budget, setBudget } = useBudgetStore();

  const total = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);

  const alertShownRef = useRef(false);

  useEffect(() => {
    if (total > budget && !alertShownRef.current) {
      toast.warning(
        `⚠️ Budget exceeded! Limit: $${budget}, Current: $${total.toFixed(2)}`,
      );
      alertShownRef.current = true;
    }
    if (total <= budget && alertShownRef.current) {
      alertShownRef.current = false;
    }
  }, [total, budget]);

  if (loading)
    return <p className="text-blue-600 dark:text-blue-400">Loading...</p>;
  if (error) return <p className="text-red-500 dark:text-red-400">{error}</p>;

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <label className="font-medium">Set Budget:</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="border p-1 rounded dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by category:</label>
        <select
          value={filterCategory}
          onChange={(e) => filterByCategory(e.target.value)}
          className="border px-2 py-1 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card
          title="Total Expenses"
          className={total > budget ? "border-2 border-red-500" : ""}
        >
          <p
            className={`text-2xl font-bold ${
              total > budget ? "text-red-600" : "text-blue-600"
            }`}
          >
            ${total.toFixed(2)}
          </p>
        </Card>
      </div>

      <Card title="Expenses by Category">
        <ExpenseChart data={filteredExpenses} />
      </Card>
    </div>
  );
};
