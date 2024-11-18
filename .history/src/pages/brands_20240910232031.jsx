// src/components/Brands.js
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../Components/Loading';

// Define the fetch function
const fetchBrands = async () => {
  const { data } = await axios.get('/api/brands');
  return data;
};

const Brands = () => {
  const { data: brands, error ,, isLoading } = useQuery(['brands'], fetchBrands);

  if (isLoading) return <Loading/>

  return (
    <div>
      <h2>Brands</h2>
      <ul>
        {brands.map(brand => (
          <li key={brand._id}>{brand.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Brands;
