import AppContext from './AppContext';
import { useState } from 'react';

const AppState = (props) => {
    const [transitStats, setTransitStats] = useState(0);
    const [drivingStats, setDrivingStats] = useState(0);
    const [walkingStats, setWalkingStats] = useState(0);

    return (
        <AppContext.Provider
            value={{
                transitStats,
                setTransitStats,
                drivingStats,
                setDrivingStats,
                walkingStats,
                setWalkingStats,
            }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;
