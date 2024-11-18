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
    <h2 className='main-color py-5 text-center'>Brands</h2>
    <div className='row'>

    {brands.map((brand) => (
      <div className='col-md-6 col-sm-12'>
      <div className="card-item mb-3 " key={brand._id}>

        <div className="card-header ">
        <h4 className='fw-bolder'> {brand.name}</h4>

        </div>
        </div>
        
      </div>
    ))}
  </div></div>
  );
};

export default Brand;
 