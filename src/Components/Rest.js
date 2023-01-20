import React, { useState, useEffect } from 'react';

const FoursquareAPI = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [location, setLocation] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLocation({
                lat: position.coords.latitude,
                long: position.coords.longitude
            });
        });
    }, []);

    useEffect(() => {
        if (location.lat && location.long) {
            fetch(`https://api.foursquare.com/v2/venues/search?client_id=TUYVHD53S13AGLF2L50O2N2R5IA5JO4E0Z4EGI152M40RFBE&client_secret=VSNBJ45MVPFJB0BZE5V0A5BRT0XQN4TV3RBKVDCXFWTUAO4H&ll=40.7,-74&query=sushi&v=20221201`)
                .then(res => res.json())
                .then(data => console.log(data) )
                .catch(err => console.log(err));
        }
    }, [location]);
console.log(restaurants)
    return (
        <div>
            <h1>Restaurants à proximité :</h1>
            <ul>
                {restaurants.map((restaurant, index) => (
                    <li key={index}>{restaurant.venue.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FoursquareAPI;
