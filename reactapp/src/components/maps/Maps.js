// https://maps.googleapis.com/maps/api/distancematrix/json?destinations=41.6655101%2C-72.89188969999998&origins=40.6655101%2C-73.89188969999998&key=AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc
import React from 'react';
import { useState } from 'react';

import Geocode from 'react-geocode';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc');

// set response language. Defaults to english.
Geocode.setLanguage('en');

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
//Geocode.setRegion('es');

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType('ROOFTOP');

// Enable or disable logs. Its optional.
Geocode.enableDebug();
/*
// Get address from latitude & longitude.
Geocode.fromLatLng('48.8583701', '2.2922926').then(
    (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
    },
    (error) => {
        console.error(error);
    },
);

// Get formatted address, city, state, country from latitude & longitude when
// Geocode.setLocationType("ROOFTOP") enabled
// the below parser will work for most of the countries
Geocode.fromLatLng('48.8583701', '2.2922926').then(
    (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                switch (response.results[0].address_components[i].types[j]) {
                    case 'locality':
                        city = response.results[0].address_components[i].long_name;
                        break;
                    case 'administrative_area_level_1':
                        state = response.results[0].address_components[i].long_name;
                        break;
                    case 'country':
                        country = response.results[0].address_components[i].long_name;
                        break;
                    default:
                        break;
                }
            }
        }
        console.log(city, state, country);
        console.log(address);
    },
    (error) => {
        console.error(error);
    },
);*/

//DESTINATION
// Get latitude & longitude from address.
/*Geocode.fromAddress('10 Brentwood Common NW').then(
    (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
    },
    (error) => {
        console.error(error);
    },
);

//ORIGIN
// Get latitude & longitude from address.
Geocode.fromAddress('10 Brentwood Common NW').then(
    (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
    },
    (error) => {
        console.error(error);
    },
);
*/

const Maps = () => {
    const [origin, setOrigin] = useState('10 Brentwood Common NW');
    const [destination, setDestination] = useState('University of Calgary');
    const [originLatLong, setOriginLatLong] = useState(null);
    const [destinationLatLong, setDestinationLatLong] = useState(null);

    const originChange = (val) => {
        setOrigin(val);
        Geocode.fromAddress(val).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setOriginLatLong([lat, lng]);
            },
            (error) => {
                return error;
            },
        );
    };

    const destinationChange = (val) => {
        setDestination(val);
        Geocode.fromAddress(val).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setDestinationLatLong([lat, lng]);
            },
            (error) => {
                return error;
            },
        );
    };

    const submitLocations = () => {
        const url = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${originLatLong[0]},${originLatLong[1]}&destinations=${destinationLatLong[0]},${destinationLatLong[1]}&travelMode=driving&key=AgY8Tz1I-3e1GUD0ylU5dDBT6-xG9k3SqreJGYxdmliZeCXFhLSgd29LUezMYRLs`;
        // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?departure_time=now&destinations=51.086970%2C-114.128290&origins=51.043500%2C-114.070430&key=AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc`;
        // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=
        //     ${destinationLatLong[0]}
        //     %2C
        //     ${destinationLatLong[1]}
        //     &origins=
        //     ${originLatLong[0]}
        //     %2C
        //     ${originLatLong[1]}
        //     &key=AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc`;
        fetch(url, {
            // headers: {
            //     // 'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Methods': 'GET',
            //     // 'Access-Control-Allow-Headers': '*',
            //     'Access-Control-Allow-Credentials': 'true',
            //     // 'Content-Type': 'application/json',
            // },
        })
            .then((response) => response.json())
            .then((data) => console.log('Data from fetch: ', data))
            .catch((error) => {
                console.error('There was an error!', error);
            });

        // const res = await fetch(
        //     'https://maps.googleapis.com/maps/api/distancematrix/json?destinations=' +
        //         destinationLatLong[0] +
        //         '%2C' +
        //         destinationLatLong[1] +
        //         '&origins=' +
        //         originLatLong[0] +
        //         '%2C' +
        //         originLatLong[1] +
        //         '&key=AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc',
        //     {
        //         mode: 'cors',
        //         headers: {
        //             'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        //             'Content-Type': 'application/json',
        //         },
        //     },
        // );
        // console.log(res);
        // const data = await res.json();
        // if (data.message !== undefined) {
        //     console.log('ERROR');
        // } else {
        //     console.log(data);
        // }

        // fetch(
        //     'https://maps.googleapis.com/maps/api/distancematrix/json?destinations=' +
        //         destinationLatLong[0] +
        //         '%2C' +
        //         destinationLatLong[1] +
        //         '&origins=' +
        //         originLatLong[0] +
        //         '%2C' +
        //         originLatLong[1] +
        //         '&key=AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc',
        // )
        //     .then(async (response) => {
        //         const data = await response.json();

        //         // check for error response
        //         if (!response.ok) {
        //             // get error message from body or default to response statusText
        //             const error = (data && data.message) || response.statusText;
        //             return Promise.reject(error);
        //         }

        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         console.error('There was an error!', error);
        //     });

        // let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?destinations='+LatLong.Lat_Des+'%2C+ LatLong.Long_Des'+'&origins='+LatLong.Lat_Or+'%2C'+LatLong.Long_Or+'&key=AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc';
        //console.log(url);
        //console.log(LatLong);
        //history.push();
    };

    return (
        <>
            <input value={origin} onChange={(e) => originChange(e.target.value)} placeholder='origin' type='text' name='origin' required />
            <input value={destination} onChange={(e) => destinationChange(e.target.value)} placeholder='destination' type='text' name='destination' required />

            <button type='button' onClick={submitLocations}>
                Submit
            </button>
            <div>{originLatLong}</div>
            <div>{destinationLatLong}</div>
        </>
    );
};

export default Maps;
