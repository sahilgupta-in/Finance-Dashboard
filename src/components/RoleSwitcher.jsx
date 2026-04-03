import { useState } from "react";
import { useStore } from "../store/useStore";
import { UserPen } from "lucide-react";

export default function RoleSwitcher() {
  const { role, setRole } = useStore();
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setRole(value);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* ICON BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg  border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer dark:hover:bg-gray-700 transition"
      >
        <UserPen size={20} className="text-gray-600 dark:text-gray-300" />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-md z-50">
          <button
            onClick={() => handleSelect("viewer")}
            className={`w-full text-left px-3 py-2 text-sm 
        text-gray-700 dark:text-gray-200 
        hover:bg-gray-100 dark:hover:bg-gray-700
        ${role === "viewer" ? "text-teal-600 dark:text-teal-400 font-medium" : ""}
      `}
          >
            Viewer
          </button>

          <button
            onClick={() => handleSelect("admin")}
            className={`w-full text-left px-3 py-2 text-sm 
        text-gray-700 dark:text-gray-200 
        hover:bg-gray-100 dark:hover:bg-gray-700
        ${role === "admin" ? "text-teal-600 dark:text-teal-400 font-medium" : ""}
      `}
          >
            Admin
          </button>
        </div>
      )}
    </div>
  );
}
