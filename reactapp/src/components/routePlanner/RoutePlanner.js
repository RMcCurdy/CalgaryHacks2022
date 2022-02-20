import React from 'react';
import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';
import Maps from '../maps/Maps';

const RoutePlanner = () => {
    const { transitStats, drivingStats, walkingStats } = useContext(AppContext);

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
