import React, { useEffect, useState } from "react";
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

const generateRandomData = (num: number): number[] => {
  return Array.from({ length: num }, () => Math.floor(Math.random() * 1000));
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const LineChart: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const revenueData = generateRandomData(labels.length);
    const costData = generateRandomData(labels.length);

    const chartData = {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: revenueData,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
        },
        {
          label: "Cost",
          data: costData,
          fill: false,
          borderColor: "rgba(255,99,132,1)",
          tension: 0.1,
        },
      ],
    };

    setData(chartData);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Line Chart with Random Revenue and Cost",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return <Line data={data} options={options} className="w-75 mx-auto" />;
};

export default LineChart;
