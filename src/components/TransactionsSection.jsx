import { useMemo, useState } from "react";
import { useStore } from "../store/useStore";
import { Funnel, Search, Trash2, Download } from "lucide-react";

import AddTransactionModal from "./AddTransactionModal";

export default function TransactionsSection() {
  const [search, setSearch] = useState("");
  const { role, transactions, deleteTransaction } = useStore();
  const [typeFilter, setTypeFilter] = useState("all");
  const [sort, setSort] = useState("latest");
  const [showModal, setShowModal] = useState(false);

  const filteredData = useMemo(() => {
    let data = [...transactions];

    if (search) {
      data = data.filter((t) =>
        t.category.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (typeFilter !== "all") {
      data = data.filter((t) => t.type === typeFilter);
    }

    if (sort === "latest") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "oldest") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === "amount") {
      data.sort((a, b) => b.amount - a.amount);
    }

    return data;
  }, [search, typeFilter, sort]);

  const handleExportCSV = () => {
    if (!transactions.length) return;

    // Header row
    const headers = ["Date", "Amount", "Category", "Type"];

    // Convert data
    const rows = transactions.map((t) => [
      t.date,
      t.amount,
      t.category,
      t.type,
    ]);

    // Combine
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    // Create file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Download
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6">
        {/* TOP ROW */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
              Transaction and invoices
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              Stay update on recent financial activities
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* ✅ ADMIN ONLY BUTTON */}
            {role === "admin" && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#299D91] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm cursor-pointer transition"
              >
                + Add Transaction
              </button>
            )}
          </div>
          {/* CONTROLS */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
            {/* SEARCH */}
            <div className="relative w-full sm:w-56">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              />

              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none"
              />
            </div>

            {/* TYPE FILTER */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-sm border cursor-pointer border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* SORT */}
            <div className="relative w-full  sm:w-auto">
              <Funnel
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2   text-gray-500 dark:text-gray-400"
              />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg appearance-none focus:outline-none"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="amount">Amount</option>
              </select>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:text-white dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* TABLE */}
        {filteredData.length === 0 ? (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
            No transactions found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full  text-sm">
              <thead className="text-gray-600 dark:text-gray-300 text-left">
                <tr>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Type</th>
                  {/* ✅ Add this */}
                  {role === "admin" && <th>Action</th>}
                </tr>
              </thead>

              <tbody>
                {filteredData.map((t) => (
                  <tr
                    key={t.id}
                    className="border-t border-gray-100 dark:text-gray-200 dark:border-gray-700"
                  >
                    <td className="py-3">{t.date}</td>
                    <td className="py-3 font-medium">${t.amount}</td>
                    <td>{t.category}</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          t.type === "income"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>

                    {/* ✅ STEP 5: DELETE BUTTON */}
                    {role === "admin" && (
                      <td>
                        <button
                          onClick={() => {
                            if (confirm("Delete this transaction?")) {
                              deleteTransaction(t.id);
                            }
                          }}
                          className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODAL */}
        {showModal && (
          <AddTransactionModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
}
