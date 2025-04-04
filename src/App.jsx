import React, { useState, useEffect } from "react";
import BalanceDisplay from "./components/BalanceDisplay";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTrends from "./components/ExpenseTrends";
import AddBalanceModal from "./components/AddBalanceModal";
import AddExpenseModal from "./components/AddExpenseModal";
import { SnackbarProvider, useSnackbar } from "notistack";
import "./App.css";

const AppWrapper = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  );
};

const App = () => {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedExpenses = localStorage.getItem("expenses");

    if (storedBalance) setBalance(parseFloat(storedBalance));
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
  }, []);

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  const handleAddBalance = (amount) => {
    setBalance((prev) => prev + amount);
    enqueueSnackbar(`Added $${amount} to balance`, { variant: "success" });
  };

  const handleAddExpense = (expense) => {
    if (expense.price > balance) {
      enqueueSnackbar("Expense exceeds wallet balance!", { variant: "error" });
      return false;
    }

    if (editingExpense) {
      const originalAmount = editingExpense.price;
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === editingExpense.id ? expense : exp))
      );
      setBalance((prev) => prev + originalAmount - expense.price);
      enqueueSnackbar("Expense updated successfully", { variant: "success" });
    } else {
      setExpenses((prev) => [...prev, expense]);
      setBalance((prev) => prev - expense.price);
      enqueueSnackbar("Expense added successfully", { variant: "success" });
    }

    setEditingExpense(null);
    return true;
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowExpenseModal(true);
  };

  const handleDeleteExpense = (id, price) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    setBalance((prev) => prev + price);
    enqueueSnackbar("Expense deleted successfully", { variant: "success" });
  };

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

      <div className="balance-section">
        <BalanceDisplay
          balance={balance}
          onAddBalance={() => setShowBalanceModal(true)}
        />
      </div>

      <div className="action-buttons">
        <button
          type="button"
          className="btn add-income-btn"
          onClick={() => setShowBalanceModal(true)}
        >
          + Add Income
        </button>
        <button
          type="button"
          className="btn add-expense-btn"
          onClick={() => setShowExpenseModal(true)}
        >
          + Add Expense
        </button>
      </div>

      <div className="charts-container">
        <div className="chart">
          <ExpenseSummary expenses={expenses} />
        </div>
        <div className="chart">
          <ExpenseTrends expenses={expenses} />
        </div>
      </div>

      <div className="expense-list-container">
        <ExpenseList
          expenses={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </div>

      <AddBalanceModal
        isOpen={showBalanceModal}
        onClose={() => setShowBalanceModal(false)}
        onAddBalance={handleAddBalance}
      />

      <AddExpenseModal
        isOpen={showExpenseModal}
        onClose={() => {
          setShowExpenseModal(false);
          setEditingExpense(null);
        }}
        onAddExpense={handleAddExpense}
        expense={editingExpense}
      />
    </div>
  );
};

export default AppWrapper;
