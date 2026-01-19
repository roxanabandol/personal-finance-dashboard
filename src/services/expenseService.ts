import { Expense } from "../types/expense";
import axios from "axios";

const API_URL = "http://localhost:3001/expenses";

export const fetchExpenses = async (): Promise<Expense[]> => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching expenses:", err);
    return [];
  }
};

export const addExpenseAPI = async (
  expense: Omit<Expense, "id">,
): Promise<Expense> => {
  try {
    const res = await axios.post(API_URL, expense);
    return res.data;
  } catch (err) {
    console.error("Error adding expense:", err);
    throw err;
  }
};

export const deleteExpenseAPI = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (err) {
    console.error("Error deleting expense:", err);
    throw err;
  }
};
