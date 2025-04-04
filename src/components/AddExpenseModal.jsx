import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("#root");

const AddExpenseModal = ({ isOpen, onClose, onAddExpense, expense }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "food",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        price: expense.price.toString(),
        category: expense.category,
        date: expense.date,
      });
    } else {
      setFormData({
        title: "",
        price: "",
        category: "food",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: expense ? expense.id : Date.now(),
      title: formData.title,
      price: parseFloat(formData.price),
      category: formData.category,
      date: formData.date,
    };

    if (onAddExpense(newExpense)) {
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
        <h2>{expense ? "Edit Expense" : "Add Expense"}</h2>
        <button onClick={onClose} className="close-btn">
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Amount</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn submit-btn">
          {expense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
