import React from 'react';
import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

import GoogleMapsMap from './GoogleMapsMap';

import EnvCalculator from '../calc/EnvCalculator';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

    const [startAnimationOne, setStartAnimationOne] = useState(false);

    const carTransports = ['car', 'suv', 'truck'];

    const {
        setTransitStats,
        setDrivingStats,
        setWalkingStats,
        setOriginLat,
        setOriginLong,
        setDestinationLat,
        setDestinationLong,
        setOriginName,
        setDestinationName,
        walkingScore,
        carScore,
        transitScore,
        selection,
        setSelection,
    } = useContext(AppContext);

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
        setStartAnimationOne(true);
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

    const incrementCarArray = () => {
        if (selection === 'car') {
            setSelection('suv');
        } else if (selection === 'suv') {
            setSelection('truck');
        } else {
            setSelection('car');
        }
    };

    const decrementCarArray = () => {
        if (selection === 'car') {
            setSelection('truck');
        } else if (selection === 'suv') {
            setSelection('car');
        } else {
            setSelection('suv');
        }
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
                                <div className='route-descriptor' style={{ marginTop: '3rem', marginBottom: '0' }}>
                                    Below are the different methods of transportation and their EcoMaps Rating.
                                </div>
                                <div className='route-descriptor' style={{ marginTop: '0', marginBottom: '0', fontFamily: 'Mukta-EL' }}>
                                    To find out more about the EcoMaps Rating, scroll to the bottom of the page.
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className='card-container' style={{ marginTop: '3rem', position: 'relative' }}>
                                            <div className='notification-score' style={{ backgroundColor: carScore > 75 ? 'green' : carScore > 50 ? 'orange' : 'red' }}>
                                                {carScore}
                                            </div>
                                            {selection === 'car' ? (
                                                <img className='transportation-icon' src={Car} alt='car' />
                                            ) : selection === 'suv' ? (
                                                <img className='transportation-icon' src={SUV} alt='suv' />
                                            ) : (
                                                <img className='transportation-icon' src={Truck} alt='truck' />
                                            )}
                                        </div>
                                        <div style={{ marginTop: '3rem', marginLeft: '2rem' }}>
                                            <div className='title-icon'>
                                                <ArrowBackIosIcon className='arrow-icon' onClick={decrementCarArray} />
                                                {selection === 'car' ? <span>CAR</span> : selection === 'suv' ? <span>SUV</span> : <span>TRUCK</span>}
                                                <ArrowForwardIosIcon className='arrow-icon' onClick={incrementCarArray} />
                                            </div>
                                            <div style={{ maxWidth: '25vw' }}>
                                                {carScore > 75 ? (
                                                    <>
                                                        <div className='content-icon'>{carScore} is not a great score, you should travel like this! </div>
                                                        <div className='content-icon'>
                                                            Not only is this an efficient way of travelling for you, but you are also doing your part in reducing emissions.
                                                        </div>
                                                    </>
                                                ) : carScore > 50 ? (
                                                    <>
                                                        <div className='content-icon'>{carScore} is not a bad score, but you could do better. </div>
                                                        <div className='content-icon'>Try to carpool with a friend or co-worker to reduce the amount of cars on the road.</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='content-icon'>{carScore} is a bad score, and is very inefficient. </div>
                                                        <div className='content-icon'>Try choosing one of the other two options if they have a lower score.</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className='card-container' style={{ position: 'relative' }}>
                                            <div className='notification-score' style={{ backgroundColor: transitScore > 75 ? 'green' : transitScore > 50 ? 'orange' : 'red' }}>
                                                {transitScore}
                                            </div>
                                            <img className='transportation-icon' src={Bus} alt='car' />
                                        </div>
                                        <div style={{ marginTop: '1rem', marginLeft: '2rem' }}>
                                            <div className='title-icon'>TRANSIT</div>
                                            <div style={{ maxWidth: '25vw' }}>
                                                {transitScore > 75 ? (
                                                    <>
                                                        <div className='content-icon'>{transitScore} is not a great score, you should travel like this! </div>
                                                        <div className='content-icon'>
                                                            Not only is this an efficient way of travelling for you, but you are also doing your part in reducing emissions.
                                                        </div>
                                                    </>
                                                ) : transitScore > 50 ? (
                                                    <>
                                                        <div className='content-icon'>{transitScore} is not a bad score, but you could do better. </div>
                                                        <div className='content-icon'>If you need to use transit, try getting off part way to reduce your carbon footprint!</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='content-icon'>{transitScore} is a bad score, and is very inefficient. </div>
                                                        <div className='content-icon'>Try choosing one of the other two options if they have a lower score.</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className='card-container' style={{ position: 'relative' }}>
                                            <div className='notification-score' style={{ backgroundColor: walkingScore > 75 ? 'green' : walkingScore > 50 ? 'orange' : 'red' }}>
                                                {walkingScore}
                                            </div>
                                            <img className='transportation-icon' src={Walk} alt='car' />
                                        </div>
                                        <div style={{ marginTop: '1rem', marginLeft: '2rem' }}>
                                            <div className='title-icon'>WALK</div>
                                            <div style={{ maxWidth: '25vw' }}>
                                                {walkingScore > 75 ? (
                                                    <>
                                                        <div className='content-icon'>{walkingScore} is a great score, you should travel like this! </div>
                                                        <div className='content-icon'>
                                                            Not only is this an efficient way of travelling for you, but you are also doing your part in reducing emissions.
                                                        </div>
                                                    </>
                                                ) : walkingScore > 50 ? (
                                                    <>
                                                        <div className='content-icon'>{walkingScore} is not a good score, it will take a long time to travel like this! </div>
                                                        <div className='content-icon'>
                                                            Walking will produce the least emissions, but walking to this destination will take a very long time.
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='content-icon'>{walkingScore} is a bad score, and is very inefficient. </div>
                                                        <div className='content-icon'>Try choosing one of the other two options if they have a lower score.</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <EnvCalculator />
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
                                        className='back-button'
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
                        {startAnimationOne ? (
                            <div className='fade-out'>
                                <div className='route-descriptor'>Please provide your starting and end location to begin your journey!</div>
                                <div className='input-container'>
                                    <div className='textfield-container'>
                                        <input
                                            className='textfield'
                                            value={origin}
                                            onChange={(e) => originChange(e.target.value)}
                                            placeholder='Start Location'
                                            type='text'
                                            name='origin'
                                        />
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
                            </div>
                        ) : (
                            <>
                                <div className='route-descriptor'>Please provide your starting and end location to begin your journey!</div>
                                <div className='input-container'>
                                    <div className='textfield-container'>
                                        <input
                                            className='textfield'
                                            value={origin}
                                            onChange={(e) => originChange(e.target.value)}
                                            placeholder='Start Location'
                                            type='text'
                                            name='origin'
                                        />
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
                    </>
                )}
            </div>
        </>
    );
};

export default Maps;
