import { useLocation } from "react-router-dom";
import Header from "./Header";
import Chart from "chart.js/auto";
import { useEffect } from "react";

const Dashboard = () => {
  // useEffect(() => {
    // Fetch data or use your own data
  //   const data = {
  //     labels: ["January", "February", "March", "April", "May", "June", "July"],
  //     datasets: [
  //       {
  //         label: "My First Dataset",
  //         data: [65, 59, 80, 81, 56, 55, 40],
  //         fill: false,
  //         borderColor: "rgb(75, 192, 192)",
  //         tension: 0.1,
  //       },
  //     ],
  //   };

  //   // Get the canvas element
  //   const ctx = document.getElementById("myChart").getContext("2d");

  //   // Create the chart
  //   new Chart(ctx, {
  //     type: "line",
  //     data: data,
  //   });
  // }, []);

  return (
    <>
      <Header />
      {/* <div>
        <h2>My Graph</h2>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div> */}
    </>
  );
};

export default Dashboard;
