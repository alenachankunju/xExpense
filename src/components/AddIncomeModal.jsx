// AddIncomeModal.jsx
import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddIncomeModal = ({ isOpen, onClose, onAddIncome }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIncome(parseFloat(amount));
    setAmount("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Income Amount"
            required
          />
        </div>
        <button type="submit" className="btn add-income">
          Add Balance
        </button>
      </form>
    </Modal>
  );
};

export default AddIncomeModal;
