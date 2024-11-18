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