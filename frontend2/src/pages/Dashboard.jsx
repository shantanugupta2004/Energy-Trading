import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:5000/analytics/transactions")
            .then(response => setTransactions(response.data.result))
            .catch(error => console.error("Error fetching transactions", error));

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    // If there are no transactions, return a loading message
    if (transactions.length === 0) {
        return <p className="text-center text-gray-600">Loading transaction data...</p>;
    }

    // Extract relevant transaction data
    const labels = transactions.map(tx => new Date(tx.timeStamp * 1000).toLocaleDateString());
    const values = transactions.map(tx => parseFloat(tx.value) / 1e18);

    const reversedLabels = labels.slice().reverse();
    const reversedValues = values.slice().reverse();

    // Chart Data
    const barChartData = {
        labels: reversedLabels,
        datasets: [
            {
                label: "Transaction Amount (ETH)",
                data: reversedValues,
                backgroundColor: "rgba(75,192,192,0.6)",
            },
        ],
    };

    const lineChartData = {
        labels: reversedLabels,
        datasets: [
            {
                label: "ETH Spent Over Time",
                data: reversedValues,
                borderColor: "rgba(255,99,132,1)",
                backgroundColor: "rgba(255,99,132,0.2)",
                fill: true,
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <h2 className="text-2xl font-bold text-center my-4">Transaction Analytics</h2>
            
            <div className="chart-container">
                <Bar ref={chartRef} data={barChartData} />
            </div>

            <div className="chart-container">
                <Line data={lineChartData} />
            </div>
        </div>
    );
};

export default Dashboard;
