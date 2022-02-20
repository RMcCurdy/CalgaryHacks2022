import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const walkScore = 100;



export const data = {

    datasets: [
        {
            label: '# of Votes',
            data: [walkScore, (100-walkScore)],
            backgroundColor: ['green', '#c2f0c2'],
            borderColor: ['#c2f0c2', '#c2f0c2'],
            borderWidth: 1,
        },
    ],
};

export default function Doughnut1() {
    return (
        <div style={{ width: '50%' }}>
            <Doughnut data={data} />
        </div>
    );
}
