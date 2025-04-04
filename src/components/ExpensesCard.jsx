import React from "react";

const ExpensesCard = ({ totalExpenses, onAddExpense }) => {
  return (
    <div className="card expenses-card">
      <h2>Expenses</h2>
      <div className="amount">${totalExpenses.toFixed(2)}</div>
      <button type="button" className="btn add-expense" onClick={onAddExpense}>
        + Add Expense
      </button>
    </div>
  );
};

export default ExpensesCard;
