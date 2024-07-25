import React, { useEffect } from "react";
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/transactionServices";
import { useQuery } from "@tanstack/react-query";
Chartjs.register(ArcElement, Tooltip, Legend);

const TransactionChart = ({ filters }) => {
  //Fetching data

  const { data: transactions, isLoading, isError, error, refetch } = useQuery({
    queryFn: listTransactionsAPI(filters),
    queryKey: ["list-transactions", filters],
  })

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  //!Calculate total income and expense
  const totalIncome = transactions?.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      acc.income += transaction.amount
    } else {
      acc.expense += transaction.amount
    }
    return acc
  }, { income: 0, expense: 0 })
  //Data  Structure for our chart
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totalIncome?.income, totalIncome?.expense],
        backgroundColor: ["#00b894", "#fd79a8"],
        borderColor: ["#00b894", "#fd79a8"],
        borderWidth: 2,
        hoverOffset: 5,
      },
    ],
  }
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 25, boxWidth: 12,
          font: {
            size: 14
          }
        }
      },
      title: {
        dispaly: true,
        text: "Income vs Expense",
        font: {
          size: 18,
          weight: "bold"
        },
        padding: {
          top: 20,
          bottom: 20
        }
      }
    },
    cutout: "70%"
  }

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}><Doughnut data={data} options={options} /></div>
    </div>
  );
};

export default TransactionChart;
