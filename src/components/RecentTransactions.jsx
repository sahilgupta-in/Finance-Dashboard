
const mockTransactions = [
  { id: 1, date: "2024-07-01", amount: 200, category: "Food", type: "expense" },
  {
    id: 2,
    date: "2024-07-03",
    amount: 1200,
    category: "Salary",
    type: "income",
  },
];

export default function RecentTransactions() {
  const recent = [...mockTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
          Recent Transactions
        </h3>

        <button className="text-sm text-[#299D91] cursor-pointer">
          See all
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {recent.map((t) => (
          <div key={t.id} className="flex items-center justify-between">
            {/* LEFT */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{t.category}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(t.date).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <p
                className={`text-sm font-semibold ${
                  t.type === "income" ? "text-[#299D91]" : "text-red-500"
                }`}
              >
                {t.type === "income" ? "+" : "-"}${t.amount}
              </p>

              <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">{t.type}</p>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {recent.length === 0 && (
        <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-6">
          No recent transactions
        </p>
      )}
    </div>
  );
}
