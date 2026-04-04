import { Building2, CreditCard, Wallet, Trash2, Pencil } from "lucide-react";

const maskNumber = (lastFour) =>
  lastFour ? `**** **** **** ${lastFour}` : "**** **** **** ****";

/** Premium credit — Zorvyn teal family (matches PromoCard) */
const creditGradients = {
  slate: "from-[#1F7F75] via-[#299D91] to-[#5FBF9F]",
  emerald: "from-[#1a6b63] via-[#299D91] to-[#6dc9a8]",
  violet: "from-[#2d4a5c] via-[#299D91] to-[#8b7ab8]",
  rose: "from-[#1F7F75] via-[#299D91] to-[#e8a0a8]",
  amber: "from-[#1F7F75] via-[#299D91] to-[#d4a574]",
  ocean: "from-[#1e5f6e] via-[#299D91] to-[#5ad4e8]",
};

/** Debit — deeper, still on-brand */
const debitGradients = {
  slate: "from-gray-800 via-[#1a4d48] to-[#299D91]",
  emerald: "from-gray-900 via-[#1F7F75] to-[#3d8f85]",
  violet: "from-gray-800 via-[#2a3d4d] to-[#5c6b8a]",
  rose: "from-gray-800 via-[#4a3538] to-[#8b5a5f]",
  amber: "from-gray-800 via-[#4d4030] to-[#8b7355]",
  ocean: "from-gray-900 via-[#1e4a5c] to-[#299D91]",
};

const bankLeftAccent = {
  slate: "border-l-gray-300 dark:border-l-gray-600",
  emerald: "border-l-[#299D91]",
  violet: "border-l-violet-500 dark:border-l-violet-400",
  rose: "border-l-rose-400 dark:border-l-rose-500",
  amber: "border-l-amber-500 dark:border-l-amber-400",
  ocean: "border-l-sky-500 dark:border-l-sky-400",
};

export default function AccountCard({
  account,
  showBalance,
  isAdmin,
  onDelete,
  onEdit,
}) {
  const theme =
    account.theme && bankLeftAccent[account.theme] ? account.theme : "slate";
  const Icon =
    account.type === "bank"
      ? Building2
      : account.type === "credit"
        ? CreditCard
        : Wallet;

  const isPremium = account.type === "credit";
  const isDebit = account.type === "debit";
  const isBank = account.type === "bank";

  const cardShell =
    "relative overflow-hidden rounded-2xl p-5 transition duration-200 ease-out hover:shadow-md";

  let cardClass = `${cardShell} `;

  if (isBank) {
    cardClass += `bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-l-[3px] ${bankLeftAccent[theme]} shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:scale-[1.01]`;
  } else if (isPremium) {
    cardClass += `bg-gradient-to-r ${creditGradients[theme]} text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10 hover:scale-[1.01]`;
  } else if (isDebit) {
    cardClass += `bg-gradient-to-br ${debitGradients[theme]} text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10 hover:scale-[1.01]`;
  }

  const titleClass = isBank ? "text-gray-900 dark:text-gray-100" : "text-white";
  const subClass = isBank
    ? "text-gray-500 dark:text-gray-400"
    : "text-white/80";
  const monoClass = isBank
    ? "text-gray-700 dark:text-gray-300 tracking-widest font-mono text-sm"
    : "text-white/95 tracking-widest font-mono text-sm";

  return (
    <article className={cardClass}>
      {isPremium && (
        <div
          className="pointer-events-none absolute inset-0 bg-black/10"
          aria-hidden
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={
              isBank
                ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30"
                : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm"
            }
          >
            <Icon
              className={isBank ? "text-[#299D91]" : "text-white"}
              size={22}
              strokeWidth={2}
            />
          </span>
          <div className="min-w-0">
            <h3 className={`truncate text-md font-medium ${titleClass}`}>
              {account.name}
            </h3>
            <p className={`text-xs capitalize ${subClass}`}>
              {account.type === "bank"
                ? "Bank account"
                : account.type === "credit"
                  ? "Credit card"
                  : "Debit card"}
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="flex shrink-0 items-center gap-0.5">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(account)}
                className={
                  isBank
                    ? "rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    : "rounded-lg p-2 text-white/85 transition hover:bg-white/15"
                }
                aria-label="Edit account"
              >
                <Pencil size={16} />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Remove this account?"))
                  onDelete?.(account.id);
              }}
              className={
                isBank
                  ? "rounded-lg p-2 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/40"
                  : "rounded-lg p-2 text-white/90 transition hover:bg-white/15"
              }
              aria-label="Delete account"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <p className={`relative mt-4 ${monoClass}`}>
        {maskNumber(account.number)}
      </p>

      <div className="relative mt-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className={`text-xs ${subClass}`}>Balance</p>
          <p
            className={`mt-1 text-3xl font-semibold tabular-nums text-gray-900 dark:text-white ${
              !isBank ? "!text-white" : ""
            }`}
          >
            {showBalance ? `$${account.balance.toLocaleString()}` : "••••••"}
          </p>
        </div>
        {account.expiry && (
          <div className="text-right">
            <p className={`text-xs ${subClass}`}>Expires</p>
            <p className={`mt-1 text-sm font-medium ${titleClass}`}>
              {account.expiry}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
