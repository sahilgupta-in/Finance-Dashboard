import { create } from "zustand";

// 🔹 Load transactions from localStorage OR fallback to default
const getStoredTransactions = () => {
  try {
    const data = localStorage.getItem("transactions");

    if (data) return JSON.parse(data);

    // ✅ fallback default data (first time)
    return [
      {
        id: 1,
        date: "2025-07-01",
        amount: 200,
        category: "Food",
        type: "expense",
      },
      {
        id: 2,
        date: "2025-06-03",
        amount: 1200,
        category: "Salary",
        type: "income",
      },
      {
        id: 3,
        date: "2025-12-05",
        amount: 80,
        category: "Shopping",
        type: "expense",
      },
    ];
  } catch {
    return [];
  }
};

const getStoredAccounts = () => {
  try {
    const data = localStorage.getItem("accounts");
    if (data) return JSON.parse(data);
    return [];
  } catch {
    return [];
  }
};

const persistAccounts = (accounts) => {
  localStorage.setItem("accounts", JSON.stringify(accounts));
};

/** Extract last 4 digits from digits-only string for masking display */
export const extractLastFour = (raw) => {
  const digits = String(raw).replace(/\D/g, "");
  if (digits.length >= 4) return digits.slice(-4);
  return digits.padStart(4, "0").slice(-4);
};

export const useStore = create((set, get) => ({
  role: "viewer",

  setRole: (role) => set({ role }),

  // ✅ Load from localStorage
  transactions: getStoredTransactions(),

  accounts: getStoredAccounts(),

  addAccount: (payload) => {
    const lastFour = extractLastFour(payload.number ?? "");
    const account = {
      id: Date.now(),
      type: payload.type,
      name: String(payload.name).trim(),
      number: lastFour,
      balance: Number(payload.balance) || 0,
      expiry: payload.expiry?.trim() || undefined,
      theme: payload.theme || "slate",
    };
    const next = [account, ...get().accounts];
    persistAccounts(next);
    set({ accounts: next });
  },

  deleteAccount: (id) => {
    const next = get().accounts.filter((a) => a.id !== id);
    persistAccounts(next);
    set({ accounts: next });
  },

  updateAccount: (id, patch) => {
    const next = get().accounts.map((a) => {
      if (a.id !== id) return a;
      const updated = { ...a, ...patch };
      if (patch.number != null) {
        updated.number = extractLastFour(patch.number);
      }
      if (patch.name != null) updated.name = String(patch.name).trim();
      if (patch.balance != null) updated.balance = Number(patch.balance) || 0;
      if (patch.expiry !== undefined) {
        updated.expiry = patch.expiry?.trim() || undefined;
      }
      if (patch.theme != null) updated.theme = patch.theme;
      if (patch.type != null) updated.type = patch.type;
      return updated;
    });
    persistAccounts(next);
    set({ accounts: next });
  },

  // ➕ ADD
  addTransaction: (tx) => {
    const newTransactions = [{ ...tx, id: Date.now() }, ...get().transactions];

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
      t.id === id ? { ...t, ...updatedTx } : t,
    );

    localStorage.setItem("transactions", JSON.stringify(updated));

    set({ transactions: updated });
  },
}));
