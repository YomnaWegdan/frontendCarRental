import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import API from '../api';
import axios from 'axios';

const fetchCars = async () => {
  const { data } = await axios.get('https://backend-car-rentals.vercel.app/cars');
  return data;
};

const fetchBrands = async () => {
  const { data } = await axios.get('https://backend-car-rentals.vercel.app/brand');
  return data;
};

const AdminDashboard = () => {
  const queryClient = useQueryClient();

  // Fetch cars and brands
  const { data: cars, isLoading: carsLoading, error: carsError } = useQuery('cars', fetchCars);
  const { data: brands, isLoading: brandsLoading, error: brandsError } = useQuery('brands', fetchBrands);

  // Create Car mutation
  const createCarMutation = useMutation(
    async (newCar) => await API.post('https://backend-car-rentals.vercel.app/cars', newCar),
    {
      onSuccess: () => queryClient.invalidateQueries('cars'),
    }
  );

  // Delete Car mutation
  const deleteCarMutation = useMutation(
    async (carId) => await API.delete(`/cars/${carId}`),
    {
      onSuccess: () => queryClient.invalidateQueries('cars'),
    }
  );

  // Create Brand mutation
  const createBrandMutation = useMutation(
    async (newBrand) => await API.post('/brands', newBrand),
    {
      onSuccess: () => queryClient.invalidateQueries('brands'),
    }
  );

  // Delete Brand mutation
  const deleteBrandMutation = useMutation(
    async (brandId) => await API.delete(`/brands/${brandId}`),
    {
      onSuccess: () => queryClient.invalidateQueries('brands'),
    }
  );

  // Handlers for creating car, deleting car, creating brand, deleting brand
  const handleCreateCar = (newCar) => {
    createCarMutation.mutate(newCar);
  };

  const handleDeleteCar = (carId) => {
    deleteCarMutation.mutate(carId);
  };

  const handleCreateBrand = (newBrand) => {
    createBrandMutation.mutate(newBrand);
  };

  const handleDeleteBrand = (brandId) => {
    deleteBrandMutation.mutate(brandId);
  };

  if (carsLoading || brandsLoading) return <div>Loading...</div>;
  if (carsError || brandsError) return <div>Error loading data</div>;

  return (
    <div className="container my-5">
      <h2>Admin Dashboard</h2>
      
      <div className="row">
        {/* Cars Management */}
        <div className="col-md-6">
          <h3>Cars Management</h3>
          <ul className="list-group mb-3">
            {cars.map((car) => (
              <li key={car._id} className="list-group-item d-flex justify-content-between align-items-center">
                {car.brand.name} {car.model}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCar(car._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button
            className="btn btn-primary"
            onClick={() => handleCreateCar({
              model: 'New Car Model', 
              brand: brands[0]._id, 
              year: 2023, 
              pricePerDay: 50,
              availability: true,
              image: {
                secure_url: 'https://via.placeholder.com/150',
                public_id: 'placeholder'
              }
            })}
          >
            Add New Car
          </button>
        </div>

        {/* Brands Management */}
        <div className="col-md-6">
          <h3>Brands Management</h3>
          <ul className="list-group mb-3">
            {brands.map((brand) => (
              <li key={brand._id} className="list-group-item d-flex justify-content-between align-items-center">
                {brand.name}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteBrand(brand._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button
            className="btn btn-primary"
            onClick={() => handleCreateBrand({
              name: 'New Brand Name'
            })}
          >
            Add New Brand
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
