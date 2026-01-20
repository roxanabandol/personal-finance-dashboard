import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Expense } from "../types/expense";

const expenseCollection = collection(db, "expenses");

export const subscribeToExpenses = (
  callback: (expenses: Expense[]) => void,
  onError?: (error: string) => void,
) => {
  const q = query(expenseCollection, orderBy("date", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const expenses: Expense[] = snapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
          id: doc.id,
          description: data.description as string,
          amount: data.amount as number,
          category: data.category as string,
          date: data.date as string,
        };
      });

      callback(expenses);
    },
    () => {
      onError?.("Failed to sync expenses in real-time");
    },
  );
};

export const addExpenseAPI = async (expense: Omit<Expense, "id">) => {
  await addDoc(expenseCollection, expense);
};

export const deleteExpenseAPI = async (id: string) => {
  await deleteDoc(doc(db, "expenses", id));
};

export const updateExpenseAPI = async (expense: Expense) => {
  const { id, ...data } = expense;
  await updateDoc(doc(db, "expenses", id), data);
};
