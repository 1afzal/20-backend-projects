// Frontend: ExpenseForm component
import { useState } from "react";
import api from "../api/axios";
import type { ExpenseCategory } from "../types/expense";

const categories: ExpenseCategory[] = [
  "Groceries",
  "Leisure",
  "Electronics",
  "Utilities",
  "Clothing",
  "Health",
  "Others",
];

export default function ExpenseForm({ onAdd }: {onAdd : () => void} ) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("Groceries");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    try {
      await api.post("http://localhost:6969/expense/add", {
        amount: Number(amount),
        category,
        date,
        description,
      });
      setAmount("");
      setDescription("");
      setDate("");
      onAdd();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-4 rounded shadow space-y-3">
        <input
          type="number"
          value={amount}
          placeholder="Amount"
          className="border p-2 w-full rounded"
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="border p-2 w-full rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          type="text"
          value={description}
          placeholder="Description (optional)"
          className="border p-2 w-full rounded"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 w-full rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}