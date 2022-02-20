import React from 'react';
import Doughnut1 from './Doughnut1';
import Doughnut2 from './Doughnut2';
import Doughnut3 from './Doughnut3';

const EnvCalculator = () => {
    return (
        <div className='page-container'>
            <div className='about-header-container'>
                <h6 className='about-semi-header'>- how we can -</h6>
                <h1 className='about-header'>CALCULATE</h1>
            </div>
            <div className='doughnut-container'>
                <div className='item'>
                <Doughnut1 />
                <h1 className="title"> WALK</h1>
                <span className="caption">
                Walking will always be the method of transportation with the least emissions. 
                Unfortunately, walking takes time and is not realistic in many circumstances. In this case, we would be walking X km.</span>
                </div>
                <div className='item'>
                <Doughnut2 />
                <h1 className="title"> CAR</h1>
                <span className="caption">
                In this instance, driving the car X km is the worst choice. This is beacuse of X and Y.</span>
                </div>
                 <div className='item'>
                <Doughnut3 />
               <h1 className="title"> BUS</h1>
                <span className="caption">
                Public transportation is usually better than driving. 
                In this case, the bus route is longer than the driving route, but the emissions are lower as the bus can carry more people etc...</span>
                </div>
            </div>
            
        </div>
    );
};

export default EnvCalculator;
