import { Bar } from "react-chartjs-2";

const BarChart = ({ result }) => {
  const data = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        data: result,
        backgroundColor: ["#FF204E", "#40A578"],
        borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)"],
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
  };

  return (
    <div className="h-4/5 flex justify-center">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
