import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Transactions } from "./pages/Transactions";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { useEffect } from "react";
import { useExpenseStore } from "./store/useExpenseStore";
import { Chatbot } from "./components/Chatbot";
import { Dashboard } from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { startRealtimeSync, stopRealtimeSync } = useExpenseStore();

  useEffect(() => {
    startRealtimeSync();
    return () => stopRealtimeSync();
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-6 overflow-y-auto flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
          </main>

          <Chatbot />
        </div>
      </div>

      {/* Toast notifications global */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
