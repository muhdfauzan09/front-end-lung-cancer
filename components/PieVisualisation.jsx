import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PieVisualisation = ({ pieData }) => {
  const labels = ["Postive", "Negative", "Not Diagnosed"];
  const data = {
    labels: labels,
    datasets: [
      {
        labels: "Cart",
        data: pieData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <div className="h-4/5 flex justify-center">
        <Pie data={data} />
      </div>
    </>
  );
};

export default PieVisualisation;
