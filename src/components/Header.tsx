import { useTheme } from "../context/ThemeContext";

export const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="p-4 bg-white dark:bg-gray-800 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Personal Finance Dashboard
      </h1>
      <button
        onClick={toggleDarkMode}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};
