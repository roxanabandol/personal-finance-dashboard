import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
        Finance Tracker
      </h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${isActive ? "bg-blue-200 font-semibold dark:bg-gray-700" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${isActive ? "bg-blue-200 font-semibold dark:bg-gray-700" : ""}`
          }
        >
          Transactions
        </NavLink>
      </nav>
    </div>
  );
};
