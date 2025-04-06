import React, { useState, useEffect } from "react";
import BalanceCard from "./components/BalanceCard";
import ExpensesCard from "./components/ExpensesCard";
import RecentTransactions from "./components/RecentTransactions";
import TopExpenses from "./components/TopExpenses";
import AddIncomeModal from "./components/AddIncomeModal";
import AddExpenseModal from "./components/AddExpenseModal";
import "./App.css";

const App = () => {
  // Load initial state from localStorage or use defaults
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? parseFloat(savedBalance) : 5000;
  });

  const [totalExpenses, setTotalExpenses] = useState(() => {
    const savedTotalExpenses = localStorage.getItem("expenses");
    return savedTotalExpenses ? parseFloat(savedTotalExpenses) : 0;
  });
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [
          {
            id: 1,
            title: "Dinner",
            category: "Food",
            amount: 300,
            date: "2024-05-29",
          },
          {
            id: 2,
            title: "Lunch Train Ticket",
            category: "Entertainment",
            amount: 1200,
            date: "2024-05-29",
          },
          {
            id: 3,
            title: "Hotel Stay Train Ticket Concert",
            category: "Travel",
            amount: 1500,
            date: "2024-05-29",
          },
          {
            id: 4,
            title: "Brunch Flight ",
            category: "Travel",
            amount: 1000,
            date: "2024-05-29",
          },
          {
            id: 5,
            title: "Movie Night",
            category: "Entertainment",
            amount: 600,
            date: "2024-05-29",
          },
          {
            id: 6,
            title: "Flight",
            category: "Travel",
            amount: 1500,
            date: "2024-05-29",
          },
          {
            id: 7,
            title: "Concert",
            category: "Entertainment",
            amount: 600,
            date: "2024-05-29",
          },
          {
            id: 8,
            title: "Train Ticket",
            category: "Travel",
            amount: 600,
            date: "2024-05-29",
          },
          // Add more sample transactions
        ];
  });

  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
    localStorage.setItem("expenses", totalExpenses.toString());
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balance, totalExpenses, transactions]);

  // Calculate top expense categories
  const topExpenses = [
    { category: "Food", percentage: 40 },
    { category: "Entertainment", percentage: 30 },
    { category: "Travel", percentage: 20 },
    { category: "Other", percentage: 10 },
  ];

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowExpenseModal(true);
  };

  const handleDeleteTransaction = (id) => {
    const transactionToDelete = transactions.find((t) => t.id === id);
    if (transactionToDelete) {
      const updatedTransactions = transactions.filter((t) => t.id !== id);
      setTransactions(updatedTransactions);
      setTotalExpenses((prev) => prev - transactionToDelete.amount);
      setBalance((prev) => prev + transactionToDelete.amount);
    }
  };

  const handleAddExpense = (expense) => {
    if (editingTransaction) {
      // Update existing transaction
      const originalAmount = editingTransaction.amount;
      const updatedTransactions = transactions.map((t) =>
        t.id === expense.id ? expense : t
      );
      setTransactions(updatedTransactions);
      setTotalExpenses(totalExpenses - originalAmount + expense.amount);
      setBalance(balance + originalAmount - expense.amount);
      setEditingTransaction(null);
    } else {
      // Add new transaction
      const newTransactions = [...transactions, expense];
      setTransactions(newTransactions);
      setTotalExpenses(totalExpenses + expense.amount);
      setBalance(balance - expense.amount);
    }
    setShowExpenseModal(false);
  };

  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>

      <div className="dashboard">
        <BalanceCard
          balance={balance}
          onAddIncome={() => setShowIncomeModal(true)}
        />

        <ExpensesCard
          totalExpenses={totalExpenses}
          onAddExpense={() => setShowExpenseModal(true)}
        />

        <RecentTransactions
          transactions={transactions.slice(0, 5)}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />

        <TopExpenses categories={topExpenses} />
      </div>

      <AddIncomeModal
        isOpen={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        onAddIncome={(amount) => {
          setBalance((b) => b + amount);
          setShowIncomeModal(false);
        }}
      />

      <AddExpenseModal
        isOpen={showExpenseModal}
        onClose={() => {
          setShowExpenseModal(false);
          setEditingTransaction(null);
        }}
        onAddExpense={handleAddExpense}
        transactionToEdit={editingTransaction}
      />
    </div>
  );
};

export default App;
