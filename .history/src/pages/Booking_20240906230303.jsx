import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Booking = () => {
    const { carId } = useParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/bookings', {
                car: carId,
                startDate,
                endDate,
            });
            alert('Booking successful');
            navigate('/');
        } catch (error) {
            console.error('Error booking car', error);
        }
    };

    return (
        <div>
            <h1>Booking Car</h1>
            <form onSubmit={handleBooking}>
                <label>Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <label>End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <button type="submit">Book Now</button>
            </form>
        </div>
    );
};

export default Booking;
