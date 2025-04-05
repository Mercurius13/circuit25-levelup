'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Steps Taken',
      data: [3000, 4500, 5000, 4000, 6200, 7100, 8000],
      backgroundColor: 'rgba(255, 134, 56, 0.7)',
      borderRadius: 8,
      barThickness: 30,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 2000,
      },
    },
  },
};

const StepsChart: React.FC = () => {
  return <Bar data={data} options={options} />;
};

export default StepsChart;
