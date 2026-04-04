import { useEffect, useState } from "react";
import { useStore, extractLastFour } from "../store/useStore";

const THEMES = [
  { id: "slate", label: "Slate" },
  { id: "emerald", label: "Emerald" },
  { id: "violet", label: "Violet" },
  { id: "rose", label: "Rose" },
  { id: "amber", label: "Amber" },
  { id: "ocean", label: "Ocean" },
];

const initialForm = {
  type: "bank",
  name: "",
  number: "",
  balance: "",
  expiry: "",
  theme: "slate",
};

const inputClass =
  "w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:dark:text-gray-500 p-2 rounded-lg";

export default function AddAccountModal({ onClose, editAccount }) {
  const { addAccount, updateAccount } = useStore();
  const [form, setForm] = useState(() =>
    editAccount
      ? {
          type: editAccount.type,
          name: editAccount.name,
          number: editAccount.number,
          balance: String(editAccount.balance),
          expiry: editAccount.expiry ?? "",
          theme: editAccount.theme ?? "slate",
        }
      : initialForm,
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    const digits = String(form.number).replace(/\D/g, "");
    if (digits.length < 4)
      next.number = "Enter at least 4 digits (last digits of card/account)";
    if (form.balance === "" || Number.isNaN(Number(form.balance))) {
      next.balance = "Valid balance is required";
    }
    if (form.type !== "bank" && form.expiry.trim()) {
      const ok = /^\d{2}\/\d{2}$/.test(form.expiry.trim());
      if (!ok) next.expiry = "Use MM/YY";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      type: form.type,
      name: form.name.trim(),
      number: extractLastFour(form.number),
      balance: Number(form.balance),
      expiry: form.type === "bank" ? "" : form.expiry.trim() || undefined,
      theme: form.theme,
    };

    if (editAccount) {
      updateAccount(editAccount.id, payload);
    } else {
      addAccount(payload);
    }
    onClose();
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const showExpiry = form.type === "credit" || form.type === "debit";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
      onMouseDown={handleBackdrop}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-lg border border-gray-100 dark:border-gray-800"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2
          id="account-modal-title"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
          {editAccount ? "Edit account" : "Add account"}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Bank, credit, and debit accounts are stored locally on this device.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              Account type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className={inputClass}
            >
              <option value="bank">Bank account</option>
              <option value="credit">Credit card</option>
              <option value="debit">Debit card</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Chase, Amex Gold"
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              Number (last 4+ digits) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              placeholder="Full number or last 4 digits"
              className={inputClass}
            />
            {errors.number && (
              <p className="mt-1 text-xs text-red-500">{errors.number}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              Balance (USD) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={form.balance}
              onChange={(e) => setForm({ ...form, balance: e.target.value })}
              placeholder="0.00"
              className={inputClass}
            />
            {errors.balance && (
              <p className="mt-1 text-xs text-red-500">{errors.balance}</p>
            )}
          </div>

          {showExpiry && (
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                Expiry (optional)
              </label>
              <input
                type="text"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                placeholder="MM/YY"
                className={inputClass}
              />
              {errors.expiry && (
                <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
              Card theme
            </label>
            <select
              value={form.theme}
              onChange={(e) => setForm({ ...form, theme: e.target.value })}
              className={inputClass}
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#299D91] cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              {editAccount ? "Save changes" : "Add account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
