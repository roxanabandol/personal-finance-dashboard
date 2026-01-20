import { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { Expense } from "../types/expense";
import { AnimatedListItem } from "./AnimatedListItem";
import { Modal } from "./Modal";
import { FormField } from "./FormField";
import { SelectField } from "./SelectField";

interface Props {
  expense: Expense;
}

export const TransactionCard = ({ expense }: Props) => {
  const { deleteExpense, updateExpense } = useExpenseStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);

  const handleUpdate = async () => {
    await updateExpense({ ...expense, description, amount, category });
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this transaction?"))
      await deleteExpense(expense.id);
  };

  return (
    <>
      <AnimatedListItem className="flex justify-between items-center p-4 bg-white dark:bg-gray-700 shadow rounded-lg mb-2 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition">
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
            onClick={() => setIsModalOpen(true)}
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
      </AnimatedListItem>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
            Edit Transaction
          </h2>
          <div className="flex flex-col gap-3">
            <FormField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormField
              type="number"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <SelectField
              label="Category"
              options={["Food", "Transport", "Entertainment", "Other"]}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
