import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineVisualisation = ({ graphDataNegative, graphDataPositive, label }) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: "# Positive",
        data: graphDataPositive,
        borderColor: "red",
        fill: true,
        display: false,
      },
      {
        label: "# Negative",
        data: graphDataNegative,
        borderColor: "green",
        fill: true,
      },
    ],
  };

  const options = {
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
