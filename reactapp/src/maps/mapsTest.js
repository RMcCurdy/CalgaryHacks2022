import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '800px',
};

const center = {
    lat: 51.04,
    lng: -114.06,
};

function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc',
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11} onLoad={onLoad} onUnmount={onUnmount}>
            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(MyComponent);
