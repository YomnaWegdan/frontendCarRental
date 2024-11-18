// src/components/CarList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CarList.css'; // Custom styles

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars'); 
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Cars</h2>
      <div className="row">
        {cars.map((car) => (
          <div className="col-md-4 mb-4" key={car._id}>
            <div className="card h-100">
              <img src={car.imageUrl} className="card-img-top" alt={car.model} />
              <div className="card-body">
                <h5 className="card-title">{car.model}</h5>
                <p className="card-text">${car.pricePerDay} per day</p>
                <a href={`/cars/${car._id}`} className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
