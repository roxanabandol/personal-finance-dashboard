import { useExpenseStore } from "../store/useExpenseStore";

export const Filter = () => {
  const { filterByCategory, filterCategory } = useExpenseStore();
  const categories = ["All", "Food", "Transport", "Entertainment", "Other"];

  return (
    <select
      value={filterCategory}
      onChange={(e) => filterByCategory(e.target.value)}
      className="border p-2 rounded"
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};
