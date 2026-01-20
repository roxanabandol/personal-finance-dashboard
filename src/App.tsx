import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { useEffect } from "react";
import { useExpenseStore } from "./store/useExpenseStore";

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
        </div>
      </div>
    </Router>
  );
}

export default App;
