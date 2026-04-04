import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CalendarCheck2 } from "lucide-react";
import { useStore } from "../store/useStore";
import { useMemo } from "react";

export default function ChartSection() {
  const { transactions } = useStore();

  const lineData = useMemo(() => {
    const months = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
      });

      if (!months[month]) {
        months[month] = { month, income: 0, expense: 0 };
      }

      if (t.type === "income") {
        months[month].income += t.amount;
      } else {
        months[month].expense += t.amount;
      }
    });

    // ✅ ADD THIS PART
    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return Object.values(months).sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month),
    );
  }, [transactions]);
  return (
    <div className="bg-white dark:bg-gray-900 border  border-gray-200 dark:border-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] rounded-2xl p-5">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Statistics
          </h3>

          {/* LEGEND */}
          <div className="flex gap-4 mt-2 text-md text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#299D91] rounded-full" />
              Total income
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              Total expenses
            </div>
          </div>
        </div>

        {/* FILTER */}
        <div className="flex justify-center items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-3 py-1 rounded-lg">
          <CalendarCheck2 size={20} />
          Monthly
        </div>
      </div>

      {/* CHART */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 16 }}
              style={{ color: "#9ca3af" }}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  return (
                    <div className="bg-black text-white px-3 py-1 rounded-lg text-xs">
                      ${payload[0].value.toLocaleString()}
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* INCOME LINE */}
            <Line
              type="monotone"
              dataKey="income"
              stroke="#299D91"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />

            {/* EXPENSE LINE */}
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#f97316"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BOTTOM STATS */}
      <div className="grid grid-cols-2 gap-5 mt-6  pt-4 border-t border-gray-200 dark:border-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Average income
          </p>
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
            $10,389.49
          </h3>
          <p className="text-[#299D91] text-sm">
            +9.8%{" "}
            <span className="text-gray-400 dark:text-gray-500">
              compare to last month
            </span>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Average expenses
          </p>
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
            $6,726.92
          </h3>
          <p className="text-red-500 text-sm">
            +8.7%{" "}
            <span className="text-gray-400 dark:text-gray-500">
              compare to last month
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
