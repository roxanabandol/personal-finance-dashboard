import { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { AnimatedListItem } from "./AnimatedListItem";
import { FormField } from "./FormField";
import { SelectField } from "./SelectField";
import { Expense } from "../types/expense";

interface Props {
  expense: Expense;
}

export const TransactionCard = ({ expense }: Props) => {
  const { deleteExpense, updateExpense } = useExpenseStore();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);

  const handleUpdate = async () => {
    await updateExpense({ ...expense, description, amount, category });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this transaction?"))
      await deleteExpense(expense.id);
  };

  return (
    <AnimatedListItem className="flex justify-between items-center p-4 bg-white dark:bg-gray-700 shadow rounded-lg mb-2 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition">
      {isEditing ? (
        <div className="flex gap-2 flex-1 flex-wrap">
          <FormField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormField
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <SelectField
            options={["Food", "Transport", "Entertainment", "Other"]}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-4 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              {expense.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {expense.category} - {new Date(expense.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold text-blue-600">
              ${expense.amount.toFixed(2)}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-500 hover:text-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </AnimatedListItem>
  );
};
