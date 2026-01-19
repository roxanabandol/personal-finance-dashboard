import { useEffect } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { useChartData } from "../hooks/useChartData";
import { Card } from "../components/Card";
import { ExpenseChart } from "../components/ExpenseChart";

export const Dashboard = () => {
  const { filteredExpenses, fetchAllExpenses } = useExpenseStore();
  useEffect(() => {
    fetchAllExpenses();
  }, []);

  const chartData = useChartData(filteredExpenses);
  const total = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);
  const categories = ["Food", "Transport", "Entertainment", "Other"];
  const stats = categories.map((cat) => ({
    label: cat,
    value: filteredExpenses
      .filter((e) => e.category === cat)
      .reduce((acc, e) => acc + e.amount, 0),
    color:
      cat === "Food"
        ? "text-green-600"
        : cat === "Transport"
          ? "text-yellow-600"
          : "text-blue-600",
  }));

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Total Expenses">
          <p className="text-2xl font-bold text-blue-600">
            ${total.toFixed(2)}
          </p>
        </Card>
        {stats.map((stat) => (
          <Card key={stat.label} title={stat.label}>
            <p className={`text-2xl font-bold ${stat.color}`}>
              ${stat.value.toFixed(2)}
            </p>
          </Card>
        ))}
      </div>

      <Card title="Expenses by Category">
        <ExpenseChart data={filteredExpenses} />
      </Card>
    </div>
  );
};
