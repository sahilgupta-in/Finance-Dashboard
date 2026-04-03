import { useState } from "react";
import { transactions } from "../data/transactions";
import { groupByCategory } from "./utils/calculations";
import RadialChart from "./RadialChart";

const FILTERS = ["Daily", "Weekly", "Monthly"];

export default function ExpenseCard() {
  const [filter, setFilter] = useState("Monthly");

  const filteredData = transactions;

  const grouped = groupByCategory(filteredData);
  const total = grouped.reduce((a, b) => a + b.value, 0);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl p-5 w-full">

      {/* HEADER */}
      <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
        All expenses
      </h3>

      {/* FILTERS */}
      <div className="flex gap-3 text-sm mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg transition ${
              filter === f
                ? "bg-[#299D91] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* CHART */}
      <div className="flex justify-center relative">
        <RadialChart data={grouped} />

        {/* CENTER INFO */}
        <div className="absolute top-[45%] text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total
          </p>
          <p className="font-bold text-gray-900 dark:text-white">
            ₹{total.toLocaleString()}
          </p>
        </div>
      </div>

      {/* LEGEND */}
      <div className="mt-4 space-y-2 text-sm">
        {grouped.map((item) => (
          <div
            key={item.name}
            className="flex justify-between text-gray-700 dark:text-gray-300"
          >
            <span>{item.name}</span>
            <span className="font-medium">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}