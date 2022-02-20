import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

let selection = 'truck';
let distance = 20;
let max = (320 * distance);
let carEmissions = 220;
let carpool = 2;

if(selection === 'car'){
    carEmissions = 150;
}
if(selection === 'suv'){
    carEmissions = 200;
}
if(selection === 'truck'){
    carEmissions = 294;
}


let totalEmissions = (carEmissions * distance)/carpool;
let score = 100 - (totalEmissions/max)*100;

let bg = [];
score > 66 ? bg = ['green', '#c2f0c2'] : score > 33 ? bg = ['orange', '#c2f0c2'] : bg = ['red', '#c2f0c2'];

export const data = {
    datasets: [
        {
            label: '# of Votes',
            data: [score, 100-score],
            backgroundColor: bg,
            borderColor: ['#c2f0c2', '#c2f0c2'],
            borderWidth: 1,
        },
    ],
};

export default function Doughnut2() {
    return (
        <div style={{ width: '50%' }}>
            <Doughnut data={data} />
        </div>
    );
}
