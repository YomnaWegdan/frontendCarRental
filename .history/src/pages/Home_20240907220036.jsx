import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../Components/Hero';

const Home = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const { data } = await axios.get('/cars');
            setCars(data);
        };
        fetchCars();
    }, []);

    return (
        <div>
        <Hero
            <h1>Available Cars</h1>
            <div className="car-list">
                {cars.map((car) => (
                    <div key={car._id} className="car-item">
                        <h3>{car.brand} {car.model}</h3>
                        <p>${car.pricePerDay} per day</p>
                        <Link to={`/car/${car._id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
