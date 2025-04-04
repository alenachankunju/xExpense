// AddExpenseModal.jsx
import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddExpenseModal = ({ isOpen, onClose, onAddExpense }) => {
  const [formData, setFormData] = useState({
    category: "food",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date,
    };
    onAddExpense(newExpense);
    setFormData({
      category: "food",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          >
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn add-expense">
          Add Expense
        </button>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
