import React from 'react';
import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

import GoogleMapsMap from './GoogleMapsMap';

import Car from '../../images/car.png';
import SUV from '../../images/suv.png';
import Truck from '../../images/truck.png';
import Bus from '../../images/bus.png';
import Walk from '../../images/walk.png';

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

    const [showConfirmMap, setShowConfirmMap] = useState(false);
    const [showFullOutput, setShowFullOutput] = useState(false);

    const { setTransitStats, setDrivingStats, setWalkingStats, setOriginLat, setOriginLong, setDestinationLat, setDestinationLong, setOriginName, setDestinationName } =
        useContext(AppContext);

    const originChange = (val) => {
        setOrigin(val);
        setOriginName(val);
        console.log('New origin val: ', val);
    };

    const destinationChange = (val) => {
        setDestination(val);
        setDestinationName(val);
        console.log('New destination val: ', val);
    };

    const handleLocation = () => {
        fetchDestinationGeocode();
        fetchOriginGeocode();
        setTimeout(() => {
            setShowConfirmMap(true);
        }, 2000);
    };

    const fetchOriginGeocode = () => {
        Geocode.fromAddress(origin).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setOriginLatLong([lat.toString(), lng.toString()]);
                setOriginLat(lat);
                setOriginLong(lng);
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
                setDestinationLat(lat);
                setDestinationLong(lng);
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
        setTimeout(() => {
            setShowFullOutput(true);
        }, 2000);
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
                    <h1 className='about-header'>EcoMaps</h1>
                </div>
                {showConfirmMap ? (
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
                        {showFullOutput ? (
                            <>
                                <div style={{ border: '2px solid var(--icon-green)' }}>
                                    <GoogleMapsMap />
                                </div>
                                <div>
                                    <img className='transportation-icon' src={Car} alt='car' />
                                </div>
                                <div>
                                    <img className='transportation-icon' src={Bus} alt='car' />
                                </div>
                                <div>
                                    <img className='transportation-icon' src={Walk} alt='car' />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='route-descriptor' style={{ fontSize: '1.5rem' }}>
                                    Are these your intended locations?
                                </div>
                                <div style={{ border: '2px solid var(--icon-green)' }}>
                                    <GoogleMapsMap />
                                </div>
                                <div style={{ margin: '2rem 0 1rem 0' }}>
                                    <div className='route-map-descriptor'>
                                        Click <span style={{ fontFamily: 'Mukta-M' }}>Find Routes</span> to view your most eco-friendly journey!
                                    </div>
                                    <div className='route-map-descriptor' style={{ marginTop: '-0.5rem' }}>
                                        or go <span style={{ fontFamily: 'Mukta-M' }}>Back</span> to to change your locations.
                                    </div>
                                </div>
                                <div style={{ margin: '0.5rem 0 3rem' }}>
                                    <button
                                        style={{ margin: '0 1rem' }}
                                        className='input-button'
                                        type='button'
                                        onClick={() => {
                                            setShowConfirmMap(false);
                                        }}>
                                        Back
                                    </button>
                                    <button
                                        style={{ margin: '0 1rem' }}
                                        className='input-button'
                                        type='button'
                                        onClick={() => {
                                            handleSubmit();
                                        }}>
                                        Find Routes
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <>
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
                            <img className='leaf leaf2' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' />
                            <img className='leaf leaf3' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' />
                            <img className='leaf leaf4' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' />
                            <img className='leaf leaf5' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' />
                            <img className='leaf leaf6' src='https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png' alt='leaf' />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Maps;
