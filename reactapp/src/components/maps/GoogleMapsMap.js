import React, { useContext, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';
import { InfoWindow, Marker } from '@react-google-maps/api';
import AppContext from '../../context/AppContext';

export default function GoogleMaps() {
    const { originLat, originLong, destinationLat, destinationLong, originName, destinationName } = useContext(AppContext);
    const mapContainerStyle = {
        width: '50vw',
        height: '50vh',
    };
    const center = {
        lat: (originLat + destinationLat) / 2,
        lng: (originLong + destinationLong) / 2,
    };
    const { isLoaded, loadError } = useLoadScript({
        // Uncomment the line below and add your API key
        googleMapsApiKey: 'AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc',
    });
    const markers = [
        {
            id: 1,
            name: originName,
            position: { lat: originLat, lng: originLong },
        },
        {
            id: 2,
            name: destinationName,
            position: { lat: destinationLat, lng: destinationLong },
        },
    ];

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    if (loadError) return 'Error loading Maps';
    if (!isLoaded) return 'Loading Maps';

    return (
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
            {markers.map(({ id, name, position }) => (
                <Marker key={id} position={position} onClick={() => handleActiveMarker(id)}>
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>{name}</div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    );
}
