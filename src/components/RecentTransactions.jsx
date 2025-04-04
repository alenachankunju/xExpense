import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const RecentTransactions = ({ transactions, onEdit, onDelete }) => {
  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="card transactions-card">
      <h2>Recent Transactions</h2>
      <ul className="transactions-list">
        {transactions.length === 0 ? (
          <li className="no-transactions">No transactions yet</li>
        ) : (
          transactions.map((txn) => (
            <li key={txn.id} className="transaction-item" name={txn.category}>
              <div className="transaction-info">
                <span className="category">{formatCategory(txn.category)}</span>
                <span className="date">{txn.date}</span>
                <span className="amount">${txn.amount.toFixed(2)}</span>
              </div>
              <div className="transaction-actions">
                <button
                  onClick={() => onEdit(txn)}
                  className="btn-icon"
                  aria-label="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(txn.id)}
                  className="btn-icon"
                  aria-label="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentTransactions;
