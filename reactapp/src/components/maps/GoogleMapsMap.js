import React, { useContext } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';
import AppContext from '../../context/AppContext';

export default function GoogleMaps() {
    const { originLat, originLong } = useContext(AppContext);
    const mapContainerStyle = {
        width: '50vw',
        height: '50vh',
    };
    const center = {
        lat: originLat,
        lng: originLong,
    };
    const { isLoaded, loadError } = useLoadScript({
        // Uncomment the line below and add your API key
        googleMapsApiKey: 'AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc',
    });

    if (loadError) return 'Error loading Maps';
    if (!isLoaded) return 'Loading Maps';

    return <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center} />;
}
