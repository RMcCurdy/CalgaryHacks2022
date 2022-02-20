import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Doughnut1() {
    const { walkingStats } = useContext(AppContext);
    let walkScore = 100;
    let distance = walkingStats.travelDistance;
    // let distance = walkingStats.travelDistance !== 0 ? walkingStats.travelDistance : 20;
    let time = walkingStats.travelDuration;
    // let time = walkingStats.travelDuration !== 0 ? walkingStats.travelDuration : 10;

    walkScore = walkScore - (distance + time) / 6;
    walkScore = walkScore.toFixed(1);

    let bg = [];
    walkScore > 75 ? (bg = ['green', '#c2f0c2']) : walkScore > 50 ? (bg = ['orange', '#c2f0c2']) : (bg = ['red', '#c2f0c2']);

    const data = {
        datasets: [
            {
                label: '# of Votes',
                data: [walkScore, 100 - walkScore],
                backgroundColor: bg,
                borderColor: ['#c2f0c2', '#c2f0c2'],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className='item'>
            <h1 className='title' style={{ marginTop: '0rem' }}>
                WALK
            </h1>
            <div style={{ width: '50%' }}>
                <Doughnut data={data} />
            </div>
            <h2 className='title'>{walkScore}</h2>
            <span className='caption'>
                Walking will always be the method of transportation with the least emissions. Unfortunately, walking takes time and is not realistic in many circumstances. In this
                case, we would be walking {distance}km, which would realistically take at least {time} hours.{' '}
            </span>
        </div>
    );
}
