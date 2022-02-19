import AppContext from './AppContext';
import { useState } from 'react';

const AppState = (props) => {
    const [location, setLocation] = useState('');

    return (
        <AppContext.Provider
            value={{
                location,
                setLocation,
            }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;
