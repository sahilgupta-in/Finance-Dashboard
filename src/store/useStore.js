// store/useStore.js
import { create } from "zustand";

// 🔹 Load transactions from localStorage OR fallback to default
const getStoredTransactions = () => {
  try {
    const data = localStorage.getItem("transactions");

    if (data) return JSON.parse(data);

    // ✅ fallback default data (first time)
    return [
      { id: 1, date: "2025-07-01", amount: 200, category: "Food", type: "expense" },
      { id: 2, date: "2025-06-03", amount: 1200, category: "Salary", type: "income" },
      { id: 3, date: "2025-12-05", amount: 80, category: "Shopping", type: "expense" },
    ];
  } catch {
    return [];
  }
};

export const useStore = create((set, get) => ({
  role: "viewer",

  setRole: (role) => set({ role }),

  // ✅ Load from localStorage
  transactions: getStoredTransactions(),

  // ➕ ADD
  addTransaction: (tx) => {
    const newTransactions = [
      { ...tx, id: Date.now() },
      ...get().transactions,
    ];

    // ✅ Save
    localStorage.setItem("transactions", JSON.stringify(newTransactions));

    set({ transactions: newTransactions });
  },

  // 🗑 DELETE
  deleteTransaction: (id) => {
    const updated = get().transactions.filter((t) => t.id !== id);

    localStorage.setItem("transactions", JSON.stringify(updated));

    set({ transactions: updated });
  },

  // ✏️ UPDATE
  updateTransaction: (id, updatedTx) => {
    const updated = get().transactions.map((t) =>
      t.id === id ? { ...t, ...updatedTx } : t
    );

    localStorage.setItem("transactions", JSON.stringify(updated));

    set({ transactions: updated });
  },
}));