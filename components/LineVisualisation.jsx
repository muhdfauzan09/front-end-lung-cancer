import React from "react";
import { Line } from "react-chartjs-2";

const LineVisualisation = ({ graphDataNegative, graphDataPositive, label }) => {
  const data = {
    labels: label,
    datasets: [
      {
        fill: true,
        borderColor: "red",
        label: "# Positive",
        data: graphDataPositive,
        pointBackgroundColor: "red",
      },
      {
        fill: true,
        label: "# Negative",
        borderColor: "green",
        data: graphDataNegative,
        pointBackgroundColor: "green",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          borderRadius: 1000,
          usePointStyle: true,
          useBorderRadius: true,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} height={80} width={200} />
    </div>
  );
};

export default LineVisualisation;
