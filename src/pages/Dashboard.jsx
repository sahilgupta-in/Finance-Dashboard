import { useState } from "react";

import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import ChartSection from "../components/ChartSection";
import ExpenseCard from "../components/ExpenseCard";
import StatCard from "../components/StatCard";
import PromoCard from "../components/PromoCard";
import TransactionsSection from "../components/TransactionsSection";
import RecentTransactions from "../components/RecentTransactions";

const TABS = ["Overview", "Transaction"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 theme-transition">
      <Navbar />

      <main className="p-4 md:p-6 space-y-6">
        {/* HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Good morning, Sahil
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              This is your finance report
            </p>
          </div>

          {/* TABS */}
          <nav className="flex overflow-x-auto gap-6 text-sm">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-2 cursor-pointer  whitespace-nowrap ${
                    isActive
                      ? "text-[#299D91] font-medium"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab}

                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#299D91] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </header>

        {/* ✅ OVERVIEW TAB */}
        {activeTab === "Overview" && (
          <>
            {/* SUMMARY CARDS */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <SummaryCard />

              <StatCard
                title="Monthly income"
                amount="16,281.48"
                change={9.8}
                type="income"
              />

              <StatCard
                title="Monthly expenses"
                amount="6,638.72"
                change={-8.6}
                type="expense"
              />
            </section>

            {/* CHARTS + SIDEBAR */}
            <section className="grid grid-cols-1  lg:grid-cols-3 gap-5">
              <div className=" flex flex-col gap-5 lg:col-span-2">
                <ChartSection />

                <RecentTransactions />
              </div>

              <aside className="flex flex-col gap-5">
                <ExpenseCard />
                <PromoCard />
              </aside>
            </section>
          </>
        )}

        {/* ✅ TRANSACTION TAB */}
        {activeTab === "Transaction" && <TransactionsSection />}
      </main>
    </div>
  );
}
