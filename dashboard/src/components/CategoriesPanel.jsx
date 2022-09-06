import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { categoriesInfo } from '../consts/categoriesInfo'
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: categoriesInfo.map((c) => (c.name)),
    datasets: [
        {
            label: '# of Votes',
            data:  categoriesInfo.map((c) => (c.cantidad)),
            backgroundColor: categoriesInfo.map((c) => (c.backgroundColor)),
            borderColor: categoriesInfo.map((c) => (c.borderColor)),
            borderWidth: 1,
        },
    ],
};

export default function CategoriesPanel() {
    return <Pie data={data} />;
}