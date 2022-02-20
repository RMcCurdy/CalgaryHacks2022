import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

let distance = 20;
let busDistance = distance*1.25;

// not sure of max, if its 294 doughnut dne
let max = (320 * distance);
const busEmissions = 80;
const totalEmissions = busEmissions*busDistance;
let score = 100 - (totalEmissions/max)*100;
score = score.toFixed(1);

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

export default function Doughnut3() {
    return (
         <div className='item'>
                <div style={{ width: '50%' }}>
                <Doughnut data={data} />
                 </div>
                <h1 className="title"> BUS</h1>
                <span className="caption">
                Public transportation like buses are usually better than driving, but the route can be longer. This trip is {distance}km.
                The GHG emissions from the taking the bus on this trip would be {totalEmissions}g, giving us a score of {score} out of 100.</span>
                </div>
    );
}
