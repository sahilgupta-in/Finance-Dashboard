// components/cards/BalanceCard.jsx
import { Copy } from "lucide-react";

export default function SummaryCard() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] rounded-2xl p-5 flex flex-col justify-between h-full">
      {/* TOP */}
      <div>
        <p className="text-sm text-gray-900 dark:text-gray-100">My balance</p>

        <div className="flex items-center gap-3 mt-2">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            $83,172
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              .64
            </span>
          </h2>

          <span className="text-[#299D91] text-sm font-medium">+6.7%</span>

          <span className="text-gray-500 dark:text-gray-400 text-sm hidden sm:block">
            compare to last month
          </span>
        </div>

        {/* ACCOUNT NUMBER */}
        <div className="flex items-center gap-3 mt-4 text-sm text-gray-700 dark:text-gray-300">
          <span>6549 7329 9821 2472</span>

          <button className="flex items-center gap-1 text-[#299D91] bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md text-xs">
            <Copy size={14} />
            Copy
          </button>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-5">
        <button className="flex-1 bg-[#299D91] text-white py-2 rounded-lg text-md cursor-pointer font-medium hover:opacity-90">
          Send money
        </button>

        <button className="flex-1 bg-gray-100 dark:bg-gray-800 text-[#299D91] py-2 rounded-lg text-md cursor-pointer font-medium">
          Request money
        </button>
      </div>
    </div>
  );
}
