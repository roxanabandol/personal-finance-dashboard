import { FC } from "react";
import { Expense } from "../types/expense";
import { motion } from "framer-motion";
import { useExpenseStore } from "../store/useExpenseStore";

interface Props {
  expense: Expense;
}

export const TransactionCard: FC<Props> = ({ expense }) => {
  const { deleteExpense } = useExpenseStore();

  const handleDelete = async () => {
    if (window.confirm("Delete this transaction?"))
      await deleteExpense(expense.id);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-between items-center p-4 bg-white dark:bg-gray-700 shadow rounded-lg mb-2 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition"
    >
      <div>
        <p className="font-semibold text-gray-800 dark:text-white">
          {expense.description}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {expense.category} - {new Date(expense.date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold text-blue-600">${expense.amount.toFixed(2)}</p>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </motion.li>
  );
};
