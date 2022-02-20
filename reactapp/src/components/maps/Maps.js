// https://maps.googleapis.com/maps/api/distancematrix/json?destinations=41.6655101%2C-72.89188969999998&origins=40.6655101%2C-73.89188969999998&key=AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc
import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

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
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    //const [origin_latlong, setOriginlatLong] = useState(null);
    //const [destination_latLong, setDestinationlatLong] = useState(null);


    const getLatLongFromString = (str) =>{
        Geocode.fromAddress(str).then(
        (response) => {
            const { lat, lng } = response.results[0].geometry.location;
         return [lat, lng];
        },
        (error) => {
            return error;
        },
        );         // Function returns the product of a and b
    }

    //console.log( getLatLongFromString(origin) ); 



    const submitLocations = () => {
        const dest = getLatLongFromString(destination);
        const orig = getLatLongFromString(origin);
        console.log(dest);
        console.log(orig);

       // setDestinationlatLong(dest);
       // setOriginlatLong(getLatLongFromString(origin));
       // console.log(destination_latLong);

    /*let LatLong = {
      Lat_Or: getLatLongFromString(origin)[0],
     Long_Or: getLatLongFromString(origin)[1],
     Lat_Des: getLatLongFromString(destination)[0],
     Long_Des: getLatLongFromString(destination)[1],
    }*/



  // let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?destinations='+LatLong.Lat_Des+'%2C+ LatLong.Long_Des'+'&origins='+LatLong.Lat_Or+'%2C'+LatLong.Long_Or+'&key=AIzaSyDGPo8L_ttBczo_2qxf3s9NStUhJUXUvFc';
   //console.log(url);
    //console.log(LatLong);
    //history.push();
  }

    return (
    <form>
      <input
        value={origin}
        onChange={e => setOrigin(e.target.value)}
        placeholder="origin"
        type="text"
        name="origin"
        required
      />
      <input
        value={destination}
        onChange={e => setDestination(e.target.value)}
        placeholder="destination"
        type="text"
        name="destination"
        required
      />
      
      <button type='button' onClick={submitLocations} >Submit</button>
    </form>
);
};

export default Maps;
