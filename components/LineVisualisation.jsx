import React from "react";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Total Lung Cancer",
      backgroundColor: "#034CA1",
      borderColor: "#034CA1",
      borderWidth: 3,
      data: [0, 10, 5, 2, 20, 30, 45],
      tension: 0.3,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

const LineVisualisation = () => {
  return (
    <div>
      <Line data={data} height="80px" width="200px" />
    </div>
  );
};

export default LineVisualisation;
