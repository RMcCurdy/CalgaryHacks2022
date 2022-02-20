import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    datasets: [
        {
            label: '# of Votes',
            data: [75, 25],
            backgroundColor: ['red', '#c2f0c2'],
            borderColor: ['burgandy', 'gray'],
            borderWidth: 1,
        },
    ],
};

export default function MyDoughnut() {
    return (
        <div style={{ width: '15%' }}>
            <Doughnut data={data} />
        </div>
    );
}
