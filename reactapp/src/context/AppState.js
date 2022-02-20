import AppContext from './AppContext';
import { useState } from 'react';

const AppState = (props) => {
    const [transitStats, setTransitStats] = useState(0);
    const [drivingStats, setDrivingStats] = useState(0);
    const [walkingStats, setWalkingStats] = useState(0);
    const [originLat, setOriginLat] = useState(0);
    const [originLong, setOriginLong] = useState(0);

    return (
        <AppContext.Provider
            value={{
                transitStats,
                setTransitStats,
                drivingStats,
                setDrivingStats,
                walkingStats,
                setWalkingStats,
                originLat,
                setOriginLat,
                originLong,
                setOriginLong,
            }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;
