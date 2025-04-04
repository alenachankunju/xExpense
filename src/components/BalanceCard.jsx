import React from "react";

const BalanceCard = ({ balance, onAddIncome }) => {
  return (
    <div className="card balance-card">
      <h2>Wallet Balance</h2>
      <div className="amount">${balance.toFixed(2)}</div>
      <button type="button" className="btn add-income" onClick={onAddIncome}>
        + Add Income
      </button>
    </div>
  );
};

export default BalanceCard;
