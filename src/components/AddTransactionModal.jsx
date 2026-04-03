
import { useState } from "react";
import { useStore } from "../store/useStore";

export default function AddTransactionModal({ onClose }) {
  const { addTransaction } = useStore();

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.amount || !form.category) return;

    addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="number"
            placeholder="Amount"
            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:dark:text-gray-500 p-2 rounded-lg"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:dark:text-gray-500 p-2 rounded-lg"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <select
            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#299D91] cursor-pointer text-white px-4 py-2 rounded-lg text-sm"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
