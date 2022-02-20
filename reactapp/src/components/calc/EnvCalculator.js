import React from 'react';
import Doughnut1 from './Doughnut1';
import Doughnut2 from './Doughnut2';
import Doughnut3 from './Doughnut3';

const EnvCalculator = () => {
    return (
        <div className='page-container'>
            <div className='about-header-container'>
                <h6 className='about-semi-header'>- how we can -</h6>
                <h1 className='calculate-header'>CALCULATE</h1>
            </div>
            <div className='calculate-descriptor'>
                EcoMaps uses dynamic algorithms to determine the most environmentally friendly way for you to get to your destination the fastest. We take into account the duration
                of your trip, the distance between your locations, and your method of transportation.
            </div>
            <div className='doughnut-container'>
                <Doughnut1 />
                <Doughnut2 />
                <Doughnut3 />
            </div>
        </div>
    );
};

export default EnvCalculator;
