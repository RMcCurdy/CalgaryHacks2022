import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Doughnut2() {
    const { drivingStats } = useContext(AppContext);
    let selection = 'truck';
    let distance = drivingStats.travelDistance;
    // let distance = drivingStats.travelDistance !== 0 ? drivingStats.travelDistance : 20;
    let duration = drivingStats.travelDuration;
    // let duration = drivingStats.travelDuration !== 0 ? drivingStats.travelDuration : 20;
    let carEmissions = 220;
    let carpool = 2;

    if (selection === 'car') {
        carEmissions = 150;
    }
    if (selection === 'suv') {
        carEmissions = 200;
    }
    if (selection === 'truck') {
        carEmissions = 294;
    }

    let totalEmissions = (carEmissions * distance) / carpool;
    let score = 100 - totalEmissions / (totalEmissions * 1.5) - duration;
    score = score.toFixed(1);

    let bg = [];
    score > 75 ? (bg = ['green', '#c2f0c2']) : score > 50 ? (bg = ['orange', '#c2f0c2']) : (bg = ['red', '#c2f0c2']);

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
                CAR
            </h1>
            <div style={{ width: '50%' }}>
                <Doughnut data={data} />
            </div>
            <h2 className='title'>{score}</h2>
            <span className='caption'>
                Driving is usually produces the most emissions, especially in a large SUV or truck. In this case, driving {distance}km would produce {totalEmissions}g of GHGs,
                giving a score of {score} out of 100.
            </span>
        </div>
    );
}
