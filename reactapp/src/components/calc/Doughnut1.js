import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const walkScore = 100;
let distance = 20;
let time = 6;



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
            <div className='item'>
                <div style={{ width: '50%' }}>
                <Doughnut data={data} />
                 </div>
                <h1 className="title"> WALK</h1>
                <span className="caption">
                Walking will always be the method of transportation with the least emissions. 
                Unfortunately, walking takes time and is not realistic in many circumstances. 
                In this case, we would be walking {distance}km, which would realistically take at least {time} hours. </span>
                </div>


       
    );
}
