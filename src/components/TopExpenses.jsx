import React from "react";

const TopExpenses = ({ categories }) => {
  return (
    <div className="card top-expenses-card">
      <h2>Top Expenses</h2>
      <ul className="expense-categories">
        {categories.map((cat, index) => (
          <li key={index} className="category-item">
            <span className="name">{cat.category}</span>
            <span className="percentage">{cat.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopExpenses;
