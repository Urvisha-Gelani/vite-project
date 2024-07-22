/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAppStore from "../../store/Appstore";
import { userType } from "../../interface/interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Bar Chart Example",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const BarChart: React.FC = () => {
  const { users, getUsers } = useAppStore();
  const getRandomVotes = (num: number): number[] => {
    return Array.from({ length: num }, () => Math.floor(Math.random() * 100));
  };
  const votes = getRandomVotes((users as userType[]).length);
  const data = {
    labels: (users as userType[]).map((user) => user.name),
    datasets: [
      {
        label: "# of Votes",
        data: votes,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return <Bar data={data} options={options} className="w-100"/>;
};

export default BarChart;
