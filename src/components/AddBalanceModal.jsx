import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("#root");

const AddBalanceModal = ({ isOpen, onClose, onAddBalance }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      onAddBalance(numAmount);
      setAmount("");
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-header">
        <h2>Add Income</h2>
        <button onClick={onClose} className="close-btn">
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="balance-form">
        <div className="form-group">
          <label htmlFor="amount">Income Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="Income Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <button type="submit" className="btn submit-btn">
          Add Balance
        </button>
      </form>
    </Modal>
  );
};

export default AddBalanceModal;
