import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Users",
        data: [200, 210, 230, 280, 275, 300, 290, 295, 290, 310],
        borderColor: "rgba(168, 85, 247, 1)", // Purple line
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(168, 85, 247, 0.2)"); // Light purple
          gradient.addColorStop(1, "rgba(168, 85, 247, 0)"); // Transparent
          return gradient;
        },
        fill: true,
        borderWidth: 1,
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,

        },
        border: {
          display: true,
        },
        ticks: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        border: {
          display: true,
        },
        ticks: {
          display: true,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="bg-transparent rounded-xl h-full w-full">
      <div className="h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;