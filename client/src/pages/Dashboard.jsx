import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  LogOut,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
} from "lucide-react";
import API from "../services/api";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
  });
  const navigate = useNavigate();

  // redirect to login page if no auth token found
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchTransactions();
    }
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to pull data", err);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/transactions", formData);
      setTransactions([res.data, ...transactions]);
      // Update UI instantly
      setFormData({ title: "", amount: "", category: "" }); // Clear input fields
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // State calculations for metric cards
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const totalBalance = income - expenses;

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "24px",
        fontFamily: "sans-serif",
        color: "#1f2937",
      }}
    >
      {/* Dashboard Top Header Bar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          // alignItems: "center",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "16px",
          marginBottom: "32px",
        }}
      >
        <div>
          <h2 style={{ margin: "9px" }}>Financial Analytics Dashboard</h2>
        </div>

        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "5px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            margin: "0 28px",
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      {/* Grid of Financial Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: "#ecfdf5",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #a7f3d0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#047857",
            }}
          >
            <ArrowUpCircle /> Total Income
          </div>
          <h1 style={{ color: "#065f46", marginTop: "12px" }}>
            ${income.toFixed(2)}
          </h1>
        </div>
        <div
          style={{
            background: "#fef2f2",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #fca5a5",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#b91c1c",
            }}
          >
            <ArrowDownCircle /> Expenses
          </div>
          <h1 style={{ color: "#991b1b", marginTop: "12px" }}>
            ${expenses.toFixed(2)}
          </h1>
        </div>
        <div
          style={{
            background: "#eff6ff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #93c5fd",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#1d4ed8",
            }}
          >
            <Wallet /> Net Balance
          </div>
          <h1 style={{ color: "#1e40af", marginTop: "12px" }}>
            ${totalBalance.toFixed(2)}
          </h1>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
        }}
      >
        {/* Form to Input New Financial Entries */}
        <div>
          <h3>Add New Transaction</h3>
          <form
            onSubmit={handleAddTransaction}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <input
              type="text"
              placeholder="Title (e.g., Upwork Project)"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />
            <input
              type="number"
              placeholder="Amount (Negative for expense)"
              required
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />
            <input
              type="text"
              placeholder="Category (e.g., Food, Salary)"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />
            <button
              type="submit"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                background: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <PlusCircle size={18} /> Add Entry
            </button>
          </form>
        </div>

        {/* Dynamic List Showing All Items Logged */}
        <div>
          <h3>Recent History</h3>
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {transactions.length === 0 ? (
              <p style={{ color: "#6b7280" }}>No transactions recorded yet.</p>
            ) : (
              transactions.map((t) => (
                <div
                  key={t._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    borderLeft: `5px solid ${
                      t.amount > 0 ? "#10b981" : "#ef4444"
                    }`,
                  }}
                >
                  <div>
                    <strong style={{ display: "block" }}>{t.title}</strong>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                      {t.category}
                    </span>
                  </div>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: t.amount > 0 ? "#10b981" : "#ef4444",
                    }}
                  >
                    {t.amount > 0 ? `$${t.amount}` : `-$${Math.abs(t.amount)}`}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
