import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const categories = {
    food: "Food",
    transport: "Transport",
    shopping: "Shopping",
    entertainment: "Entertainment",
    utilities: "Utilities",
    other: "Other",
  };

  return (
    <div className="expense-list">
      <h2>Expense History</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              <div className="expense-info">
                <div className="expense-title">{expense.title}</div>
                <div className="expense-category">
                  {categories[expense.category]}
                </div>
                <div className="expense-date">
                  {new Date(expense.date).toLocaleDateString()}
                </div>
                <div className="expense-amount">
                  ${expense.price.toFixed(2)}
                </div>
              </div>
              <div className="expense-actions">
                <button
                  onClick={() => onEdit(expense)}
                  className="btn-icon"
                  aria-label="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(expense.id, expense.price)}
                  className="btn-icon"
                  aria-label="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
