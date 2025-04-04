import React from "react";

const BalanceDisplay = ({ balance, onAddBalance }) => {
  return (
    <div className="balance-display">
      <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
    </div>
  );
};

export default BalanceDisplay;
