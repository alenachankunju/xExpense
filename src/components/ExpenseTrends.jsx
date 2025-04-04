import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExpenseTrends = ({ expenses }) => {
  // Group expenses by month and category
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (!acc[monthYear]) {
      acc[monthYear] = {
        month: date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        food: 0,
        transport: 0,
        shopping: 0,
        entertainment: 0,
        utilities: 0,
        other: 0,
      };
    }

    acc[monthYear][expense.category] += expense.price;
    return acc;
  }, {});

  const data = Object.values(monthlyData);

  return (
    <div className="chart-container">
      <h3>Expense Trends</h3>
      {expenses.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`$${value.toFixed(2)}`, "Amount"]}
            />
            <Legend />
            <Bar dataKey="food" stackId="a" fill="#0088FE" name="Food" />
            <Bar
              dataKey="transport"
              stackId="a"
              fill="#00C49F"
              name="Transport"
            />
            <Bar
              dataKey="shopping"
              stackId="a"
              fill="#FFBB28"
              name="Shopping"
            />
            <Bar
              dataKey="entertainment"
              stackId="a"
              fill="#FF8042"
              name="Entertainment"
            />
            <Bar
              dataKey="utilities"
              stackId="a"
              fill="#8884D8"
              name="Utilities"
            />
            <Bar dataKey="other" stackId="a" fill="#82CA9D" name="Other" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default ExpenseTrends;
