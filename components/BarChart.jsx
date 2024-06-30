import { Bar } from "react-chartjs-2";

const BarChart = ({ result }) => {
  const data = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        data: result,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(180, 255, 171, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
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
    <div className="h-4/5 flex justify-center">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
