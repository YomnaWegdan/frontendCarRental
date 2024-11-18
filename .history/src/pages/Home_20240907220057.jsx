import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Hero from '../Components/Hero.jsx';

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
        <Hero/>
            
        </div>
    );
};

export default Home;
