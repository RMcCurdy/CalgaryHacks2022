import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Doughnut3() {
    const { drivingStats, setTransitScore } = useContext(AppContext);
    let distance = drivingStats.travelDistance.toFixed(1);
    let busDistance = distance * 1.25;

    const busEmissions = 80;
    const totalEmissions = (busEmissions * busDistance).toFixed(1);
    let max = totalEmissions * busDistance;
    let score = 100 - (totalEmissions / max) * 100;
    score = score.toFixed(1);

    let bg = [];
    score > 75 ? (bg = ['green', '#c2f0c2']) : score > 50 ? (bg = ['orange', '#c2f0c2']) : (bg = ['red', '#c2f0c2']);

    setTransitScore(score);

    const data = {
        datasets: [
            {
                label: '# of Votes',
                data: [score, 100 - score],
                backgroundColor: bg,
                borderColor: ['#c2f0c2', '#c2f0c2'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='item'>
            <h1 className='title' style={{ marginTop: '0rem' }}>
                BUS
            </h1>
            <div style={{ width: '50%' }}>
                <Doughnut data={data} />
            </div>
            <h2 className='title'>{score}</h2>
            <span className='caption'>
                Public transportation like buses are usually better than driving, but the route can be longer. This trip is {distance}km. The GHG emissions from the taking the bus
                on this trip would be {totalEmissions}g, giving us a score of {score} out of 100.
            </span>
        </div>
    );
}
