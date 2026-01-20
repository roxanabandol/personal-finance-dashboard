import { useEffect } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { useChartData } from "../hooks/useChartData";
import { Card } from "../components/Card";
import { ExpenseChart } from "../components/ExpenseChart";
import { useUIStore } from "../store/useUIStore";

const Dashboard = () => {
  const {
    filteredExpenses,
    filterCategory,
    filterByCategory,
    startRealtimeSync,
    stopRealtimeSync,
  } = useExpenseStore();
  const { loading, error } = useUIStore();

  useEffect(() => {
    startRealtimeSync();
    return () => stopRealtimeSync();
  }, []);

  const chartData = useChartData(filteredExpenses);
  const total = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);

  if (loading)
    return <p className="text-blue-600 dark:text-blue-400">Loading...</p>;
  if (error) return <p className="text-red-500 dark:text-red-400">{error}</p>;

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

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
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${total.toFixed(2)}
          </p>
        </Card>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <ExpenseChart data={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Dashboard;
