import Header from "./Header";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);

  const location = useLocation();
  const { id } = location.state;
  useEffect(() => {
    fetch("/api/user/bills/" + id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setChartData(
          res.bills.sort((a, b) => new Date(a.date) - new Date(b.date))
        );
      });
  }, [id]);
  const amounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  chartData
    .map((data) => {
      const d = new Date(data.date);
      const month = d.getMonth();
      return { month: month, amounts: data.amount };
    })
    .sort((a, b) => a.month - b.month)
    .map((data) => {
      amounts[data.month] += data.amounts;
    });

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'amount',
        backgroundColor: "rgba(119, 136, 153,0.5)",
        borderwidth: 2,
        borderColor: "rgb(112, 128, 144)",
        pointBackgroundColor: "rgba(119, 136, 153,1)",
        pointRadius: 6,
        data: amounts,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: "rgba(119, 136, 153,0.5)",
        hoverRadius: 3, // Size of the dataset points on hover
        hoverBorderWidth: 2, // Border width of the dataset points on hover
        borderWidth: 2, // Border width of the dataset points
      },
    },
    layout: {
      //   padding: {
      //     left: 10,
      //     right: 10,
      //     top: 0,
      //     bottom: 0,
      //   },
    },
  };

  return (
    <>
      <Header />
      <div>
        <h1 className="text-4xl text-center p-16 font-mono">
          Monthly Billing Insight
        </h1>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-4xl h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
