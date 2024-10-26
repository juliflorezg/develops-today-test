import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PopulationChart({ populationData }) {
  const data = {
    labels: populationData.map((entry) => entry.year),
    datasets: [
      {
        label: 'Population',
        data: populationData.map((entry) => entry.value),
        borderColor: 'blue',
        backgroundColor: 'lightblue',
      },
    ],
  };

  return <Line data={data} key={populationData.length} />;
}

export default PopulationChart;
