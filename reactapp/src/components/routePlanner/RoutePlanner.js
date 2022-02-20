import React from 'react';

import Maps from '../maps/Maps';

const RoutePlanner = () => {
    return (
        <div className='page-container'>
            <div className='about-header-container'>
                <h6 className='about-semi-header'>- save the environment with -</h6>
                <h1 className='about-header'>ECOMAPS</h1>
            </div>
            <Maps />
        </div>
    );
};

export default RoutePlanner;
