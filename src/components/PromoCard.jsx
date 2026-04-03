
export default function PromoCard() {
  return (
    <div
      className="relative rounded-2xl h-full p-6 md:p-8 overflow-hidden text-white
      bg-gradient-to-r from-[#1F7F75] via-[#299D91] to-[#5FBF9F]"
    >
      {/* CONTENT */}
      <div className="max-w-xs">
        <h2 className="text-lg md:text-xl font-semibold leading-snug ">
          Secure Your Future with Our Comprehensive Retirement Plans!
        </h2>

        <button className="mt-6 bg-white/90  text-gray-800 px-4 py-2 rounded-lg text-sm  font-medium shadow-sm hover:shadow-md transition backdrop-blur-sm">
          Learn more
        </button>
      </div>

      {/* OPTIONAL: soft overlay for depth */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  );
}
