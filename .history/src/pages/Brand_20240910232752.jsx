// src/components/Brands.js
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../Components/Loading';

// Define the fetch function
const fetchBrands = async () => {
  const { data } = await axios.get('https://backend-car-rentals.vercel.app/brand');
  return data;
};

const Brand = () => {
  const { data: brands, error , isError, isLoading } = useQuery(['brands'], fetchBrands);

  if (isLoading) return <Loading/>

  if (isError) return <div>{error.message}</div>;

  return (
    <div className="container my-5">
    <h2 className='main-color py-5 text-center'>Bra</h2>
    <div className='row'>

    {brands.map((booking) => (
      <div className='col-md-6 col-sm-12'>
      <div className="card-item mb-3 " key={booking._id}>

        <div className="card-header ">
        <h4 className='fw-bolder'>Car: {booking.car.model}</h4>

        </div>
        <div className="card-body">
          <p>Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
          <p>Total Price: <span className='main-color fw-bolder'> {booking.totalPrice}$</span> </p>
        </div></div>
      </div>
    ))}
  </div></div>
  );
};

export default Brand;
  <div>
      <h2>Brands</h2>
      <ul>
        {brands.map(brand => (
          <li key={brand._id}>{brand.name}</li>
        ))}
      </ul>
    </div>