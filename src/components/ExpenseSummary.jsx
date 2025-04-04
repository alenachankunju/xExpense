import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const ExpenseSummary = ({ expenses }) => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.price;
    return acc;
  }, {});

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: parseFloat(categoryTotals[category].toFixed(2)),
  }));

  return (
    <div className="chart-container">
      <h3>Expense Summary</h3>
      {expenses.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default ExpenseSummary;
