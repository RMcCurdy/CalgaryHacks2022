import React from 'react';
import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc');
Geocode.setLanguage('en');
Geocode.setLocationType('ROOFTOP');
Geocode.enableDebug();

const Maps = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [originLatLong, setOriginLatLong] = useState(null);
    const [destinationLatLong, setDestinationLatLong] = useState(null);

    const { setTransitStats, setDrivingStats, setWalkingStats } = useContext(AppContext);

    const originChange = (val) => {
        setOrigin(val);
        console.log('New origin val: ', val);
    };

    const destinationChange = (val) => {
        setDestination(val);
        console.log('New destination val: ', val);
    };

    const handleLocation = () => {
        fetchDestinationGeocode();
        fetchOriginGeocode();
    };

    const fetchOriginGeocode = () => {
        Geocode.fromAddress(origin).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setOriginLatLong([lat.toString(), lng.toString()]);
                return [lat.toString(), lng.toString()];
            },
            (error) => {
                console.log(error);
            },
        );
    };

    const fetchDestinationGeocode = () => {
        Geocode.fromAddress(destination).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setDestinationLatLong([lat.toString(), lng.toString()]);
                return [lat.toString(), lng.toString()];
            },
            (error) => {
                console.log(error);
            },
        );
    };

    const handleSubmit = () => {
        // const originLat = await Promise.all([fetchOriginGeocode]);
        // const destLat = await Promise.all([fetchDestinationGeocode]);

        transitSubmit(
            `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${originLatLong[0]},${originLatLong[1]}&destinations=${destinationLatLong[0]},${destinationLatLong[1]}&travelMode=transit&key=AgY8Tz1I-3e1GUD0ylU5dDBT6-xG9k3SqreJGYxdmliZeCXFhLSgd29LUezMYRLs`,
        );
        drivingSubmit(
            `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${originLatLong[0]},${originLatLong[1]}&destinations=${destinationLatLong[0]},${destinationLatLong[1]}&travelMode=driving&key=AgY8Tz1I-3e1GUD0ylU5dDBT6-xG9k3SqreJGYxdmliZeCXFhLSgd29LUezMYRLs`,
        );
        walkingSubmit(
            `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${originLatLong[0]},${originLatLong[1]}&destinations=${destinationLatLong[0]},${destinationLatLong[1]}&travelMode=walking&key=AgY8Tz1I-3e1GUD0ylU5dDBT6-xG9k3SqreJGYxdmliZeCXFhLSgd29LUezMYRLs`,
        );
    };

    const transitSubmit = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setTransitStats(data.resourceSets[0].resources[0].results[0]))
            .catch((error) => {
                console.error('There was an error!', error);
            });
    };

    const drivingSubmit = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setDrivingStats(data.resourceSets[0].resources[0].results[0]))
            .catch((error) => {
                console.error('There was an error!', error);
            });
    };

    const walkingSubmit = (url) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setWalkingStats(data.resourceSets[0].resources[0].results[0]))
            .catch((error) => {
                console.error('There was an error!', error);
            });
    };

    return (
        <>
            <div className='page-container'>
                <div className='about-header-container'>
                    <h6 className='about-semi-header'>- save the environment with -</h6>
                    <h1 className='about-header'>ECOMAPS</h1>
                </div>
                <div className='route-descriptor'>Please provide your starting and end location to begin your journey!</div>
                <div className='input-container'>
                    <div className='textfield-container'>
                        <input className='textfield' value={origin} onChange={(e) => originChange(e.target.value)} placeholder='Start Location' type='text' name='origin' />
                        <input
                            className='textfield'
                            value={destination}
                            onChange={(e) => destinationChange(e.target.value)}
                            placeholder='End Location'
                            type='text'
                            name='destination'
                        />
                    </div>

                    <button
                        className='input-button'
                        type='button'
                        disabled={origin === '' || destination === '' ? true : false}
                        style={{ backgroundColor: origin === '' || destination === '' ? 'gray' : 'var(--icon-green)' }}
                        onClick={() => {
                            handleLocation();
                        }}>
                        Search
                    </button>
                    <img class='leaf leaf2' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' />
                    <img class='leaf leaf3' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' />
                    <img class='leaf leaf4' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' />
                    <img class='leaf leaf5' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' />
                    <img class='leaf leaf6' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' />
                    {/* <img class='leaf' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' /> */}
                    {/* <img class='leaf' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' /> */}
                    {/* <img class='leaf' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' /> */}
                </div>
                {/* <button
                    className='input-button'
                    type='button'
                    onClick={() => {
                        handleSubmit();
                    }}>
                    Submit
                </button> */}
            </div>
        </>
    );
};

export default Maps;
