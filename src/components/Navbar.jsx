import { useEffect, useState } from "react";
import { Search, Bell, Moon, Sun } from "lucide-react";
import RoleSwitcher from "./RoleSwitcher";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme = savedTheme ?? (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 border-b dark:border-gray-800 border-gray-200 shadow-sm px-4 md:px-6 py-3 flex items-center justify-between">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            <img src={logo} alt="logo" />
          </span>
        </div>

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
          Zorvyn Fintech
          <span className="text-gray-400">›</span>
          <span className="bg-green-50 dark:bg-green-900/30 text-[#299D91] px-3 py-1 rounded-lg font-medium">
            Dashboard
          </span>
        </div>
      </div>

      {/* SEARCH */}
      <div className="hidden lg:flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl w-75">
        <Search size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-full text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg cursor-pointer  text-gray-600 dark:text-gray-300   transition-colors"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Icons */}
        <div className="hidden sm:flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <Bell size={20} />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex items-center gap-4">
            <RoleSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
