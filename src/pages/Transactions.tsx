import { useState, useEffect } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { useUIStore } from "../store/useUIStore";
import { FormField } from "../components/FormField";
import { SelectField } from "../components/SelectField";
import { TransactionCard } from "../components/TransactionCard";

export const Transactions = () => {
  const { filteredExpenses, fetchAllExpenses, addExpense } = useExpenseStore();
  const { loading, error } = useUIStore();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Food");

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  const handleAdd = async () => {
    if (!description || !amount) return;
    await addExpense({
      description,
      amount,
      category,
      date: new Date().toISOString(),
    });
    setDescription("");
    setAmount(0);
  };

  return (
    <div>
      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Transactions
      </h1>
      <div className="flex gap-2 mb-4 flex-wrap">
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
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul>
        {filteredExpenses.map((exp) => (
          <TransactionCard key={exp.id} expense={exp} />
        ))}
      </ul>
    </div>
  );
};
