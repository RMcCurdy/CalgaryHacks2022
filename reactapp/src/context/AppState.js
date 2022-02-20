import AppContext from './AppContext';
import { useState } from 'react';

const AppState = (props) => {
    const [transitStats, setTransitStats] = useState(0);
    const [drivingStats, setDrivingStats] = useState(0);
    const [walkingStats, setWalkingStats] = useState(0);
    const [originLat, setOriginLat] = useState(0);
    const [originLong, setOriginLong] = useState(0);
    const [destinationLat, setDestinationLat] = useState(0);
    const [destinationLong, setDestinationLong] = useState(0);

    const [carScore, setCarScore] = useState(0);
    const [transitScore, setTransitScore] = useState(0);
    const [walkingScore, setWalkingScore] = useState(0);

    const [originName, setOriginName] = useState('');
    const [destinationName, setDestinationName] = useState('');

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
                destinationLat,
                setDestinationLat,
                destinationLong,
                setDestinationLong,
                originName,
                setOriginName,
                destinationName,
                setDestinationName,
                carScore,
                setCarScore,
                transitScore,
                setTransitScore,
                walkingScore,
                setWalkingScore,
            }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;
