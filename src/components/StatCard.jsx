import { BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";

export default function StatCard({ title, amount, change, type = "income" }) {
  const isPositive = change > 0;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] rounded-2xl p-5 h-full">
      {/* ICON */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-4
          ${type === "income" ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"}`}
      >
        {type === "income" ? (
          <BanknoteArrowDown className="text-[#299D91]" size={24} />
        ) : (
          <BanknoteArrowUp className="text-red-500" size={24} />
        )}
      </div>

      {/* TITLE */}
      <p className="text-md text-gray-900 dark:text-gray-100">{title}</p>

      {/* AMOUNT */}
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
        ${amount}
      </h2>

      {/* CHANGE */}
      <p
        className={`text-sm mt-1 ${
          isPositive ? "text-[#299D91]" : "text-red-500"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}%{" "}
        <span className="text-gray-500 dark:text-gray-400">
          compare to last month
        </span>
      </p>
    </div>
  );
}
