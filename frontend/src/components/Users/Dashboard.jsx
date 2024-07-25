import React, { useState } from "react";
import TransactionChart from "../Transactions/TransactionChart";
import TransactionList from "../Transactions/TransactionList";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  const handleUpdateTransactions = (newFilters) => {
    setTransactions(newFilters);
  };

  return (
    <>
      <TransactionChart filters={transactions} />
      <TransactionList onFilterChange={handleUpdateTransactions} />
    </>
  );
};

export default Dashboard;
