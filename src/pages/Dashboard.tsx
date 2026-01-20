import { useEffect } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { useChartData } from "../hooks/useChartData";
import { Card } from "../components/Card";
import { ExpenseChart } from "../components/ExpenseChart";
import { useUIStore } from "../store/useUIStore";

export const Dashboard = () => {
  const { filteredExpenses, fetchAllExpenses } = useExpenseStore();
  const { loading, error } = useUIStore();
  useEffect(() => {
    fetchAllExpenses();
  }, []);

  const chartData = useChartData(filteredExpenses);
  const total = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);

  if (loading) return <p className="text-blue-600">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Total Expenses">
          <p className="text-2xl font-bold text-blue-600">
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
