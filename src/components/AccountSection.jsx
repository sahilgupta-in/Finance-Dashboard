import { useState } from "react";
import { Eye, EyeOff, Landmark, Plus, WalletCards } from "lucide-react";
import { useStore } from "../store/useStore";
import AccountCard from "./AccountCard";
import AddAccountModal from "./AddAccountModal";

export default function AccountSection() {
  const { role, accounts, deleteAccount } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [showBalance, setShowBalance] = useState(true);

  const isAdmin = role === "admin";

  const openAdd = () => {
    setEditAccount(null);
    setShowModal(true);
  };

  const openEdit = (account) => {
    setEditAccount(account);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditAccount(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 sm:p-6">
      <div className="flex w-full flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
              Accounts
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              Bank and card balances stored locally in your browser
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowBalance((v) => !v)}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:text-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
              aria-pressed={showBalance}
              aria-label={showBalance ? "Hide balances" : "Show balances"}
            >
              {showBalance ? (
                <Eye size={18} className="text-[#299D91]" />
              ) : (
                <EyeOff
                  size={18}
                  className="text-gray-500 dark:text-gray-400"
                />
              )}
              {showBalance ? "Hide balance" : "Show balance"}
            </button>

            {isAdmin && (
              <button
                type="button"
                onClick={openAdd}
                className="bg-[#299D91] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm cursor-pointer transition hover:opacity-90"
              >
                + Add account
              </button>
            )}
          </div>
        </div>
      </div>

      {accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/30 px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 text-[#299D91]">
            <WalletCards size={28} strokeWidth={1.75} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
            No accounts yet
          </h3>
          <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
            {isAdmin
              ? "Add a bank account or card to see balances and masked numbers here."
              : "Switch to Admin in the header to add accounts, or ask an admin to set them up."}
          </p>
          {isAdmin && (
            <button
              type="button"
              onClick={openAdd}
              className="mt-6 inline-flex items-center gap-2 bg-[#299D91] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm cursor-pointer transition hover:opacity-90"
            >
              <Landmark size={18} />
              Add your first account
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              showBalance={showBalance}
              isAdmin={isAdmin}
              onDelete={deleteAccount}
              onEdit={isAdmin ? openEdit : undefined}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddAccountModal onClose={closeModal} editAccount={editAccount} />
      )}
    </div>
  );
}
