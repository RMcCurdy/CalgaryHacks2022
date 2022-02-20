import React from 'react';
import MyDoughnut from './MyDoughnut';

const EnvCalculator = () => {
    return (
        <div className='page-container'>
            <div className='about-header-container'>
                <h6 className='about-semi-header'>- how we can -</h6>
                <h1 className='about-header'>CALCULATE</h1>
            </div>
            <div className='doughnut-container'>
                <MyDoughnut />
                <MyDoughnut />
                <MyDoughnut />
            </div>
        </div>
    );
};

export default EnvCalculator;
