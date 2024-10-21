import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = ({ onSubmit }) => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    const fetchLocationSuggestions = async (query, setSuggestions) => {
        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`, {
                params: {
                    access_token: "pk.eyJ1IjoiYWtpbm9sYTIzMDMiLCJhIjoiY20xeHQ0amRlMHl3djJqcXczNjBscGhuaSJ9.bpDGfAjBj93osdFVWZz6Rw",
                    autocomplete: true,
                    limit: 5,
                },
            });

            const suggestions = response.data.features.map((feature) => feature.place_name);
            setSuggestions(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handlePickupChange = (e) => {
        setPickup(e.target.value);
        if (e.target.value.length > 2) {
            fetchLocationSuggestions(e.target.value, setPickupSuggestions);
        }
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        if (e.target.value.length > 2) {
            fetchLocationSuggestions(e.target.value, setDestinationSuggestions);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingData = { pickup, destination, date, time };
        onSubmit(bookingData);
    };

    const handlePickupSelect = (suggestion) => {
        setPickup(suggestion);
        setPickupSuggestions([]); // Hide suggestions after selection
    };

    const handleDestinationSelect = (suggestion) => {
        setDestination(suggestion);
        setDestinationSuggestions([]); // Hide suggestions after selection
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
                <input
                    type="text"
                    value={pickup}
                    onChange={handlePickupChange}
                    placeholder="Pickup Location"
                    className="border border-gray-300 p-2 rounded"
                />
                {pickupSuggestions.length > 0 && (
                    <ul className="border border-gray-300 mt-2 max-h-40 overflow-y-auto">
                        {pickupSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handlePickupSelect(suggestion)}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <input
                    type="text"
                    value={destination}
                    onChange={handleDestinationChange}
                    placeholder="Destination"
                    className="border border-gray-300 p-2 rounded"
                />
                {destinationSuggestions.length > 0 && (
                    <ul className="border border-gray-300 mt-2 max-h-40 overflow-y-auto">
                        {destinationSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleDestinationSelect(suggestion)}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 p-2 rounded"
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-gray-300 p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
    );
};

export default BookingForm;
