// src/components/ExpenseChart.tsx
import { FC } from "react";
import { Expense } from "../types/expense";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: Expense[];
}

export const ExpenseChart: FC<Props> = ({ data }) => {
  // Transformăm datele în sumă pe categorii
  const categories = ["Food", "Transport", "Entertainment", "Other"];
  const chartData = categories.map((cat) => ({
    category: cat,
    amount: data
      .filter((e) => e.category === cat)
      .reduce((acc, e) => acc + e.amount, 0),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="category" stroke="#8884d8" />
        <YAxis stroke="#8884d8" />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
