import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';  
import axios from 'axios';
import { userContext } from '../Context/UserContext';
const AdminDashboard = () => {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar mt-5">
        <nav>
          <ul>
            <li><Link to="/admin/brands">Manage Brands</Link></li>
            <li><Link to="/admin/cars">Manage Cars</Link></li>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/bookings">Manage Bookings</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;




export const ManageBrands = () => {
  const { data: brands, refetch } = useQuery('brands', () => axios.get('https://backend-car-rentals.vercel.app/brand').then(res => res.data));
  const {userToken} = useContext(userContext)
  const mutation = useMutation(
        async (newBrand) => await axios.post('https://backend-car-rentals.vercel.app/brand', newBrand , {
          headers: {
            'token': `${userToken}`,  // Update here to match backend expectations
          }}),
        {
          onSuccess: () => refetch(),         }
      );

      const deleteBrand = async (id) => {
        try {
          await axios.delete(`https://backend-car-rentals.vercel.app/brand/${id}`, {
            headers: {
              'token': `${userToken}`,  // Pass token for authorization
            }
          });
          refetch();  // Refetch the list after successful deletion
        } catch (error) {
          console.error('Error deleting brand:', error);  // Log the error for debugging
        }
      };
      
    
  const [newBrand, setNewBrand] = useState('');

  const handleCreate = () => {
    mutation.mutate({ name: newBrand });
    setNewBrand('');
  };

  return (
    <div className='mt-5'>
      <h2>Manage Brands</h2>
      <input 
        type="text" 
        value={newBrand} 
        onChange={(e) => setNewBrand(e.target.value)} 
        placeholder="New Brand Name" 
      />
      <button onClick={handleCreate}>Create Brand</button>
      
      <ul>
        {brands?.map(brand => (
          <li key={brand._id}>
            {brand.name} 
            <button onClick={() => deleteBrand(brand._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { fetchCars, createCar } from './api';

const ManageCars = () => {
  const { data: cars, refetch } = useQuery('cars', fetchCars);
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState({
    model: '',
    year: '',
    pricePerDay: ''
  });

  const createCarMutation = useMutation(createCar, {
    onSuccess: () => {
      refetch();  // Refetch the car list after creating a new car
      setShowModal(false);  // Close the modal
    }
  });

  const handleCreate = () => {
    setShowModal(true);  // Open modal
  };

  const handleClose = () => {
    setShowModal(false);  // Close modal
  };

  const handleSubmit = () => {
    createCarMutation.mutate(newCar);
  };

  const handleChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Manage Cars</h2>
      <button className="btn btn-primary" onClick={handleCreate}>Add New Car</button>
      
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Model</th>
            <th>Year</th>
            <th>Price Per Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars?.map(car => (
            <tr key={car._id}>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.pricePerDay}</td>
              <td>
                {/* Add edit/delete buttons if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Car</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="model" className="form-label">Model</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="model" 
                    name="model" 
                    value={newCar.model} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">Year</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="year" 
                    name="year" 
                    value={newCar.year} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pricePerDay" className="form-label">Price Per Day</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="pricePerDay" 
                    name="pricePerDay" 
                    value={newCar.pricePerDay} 
                    onChange={handleChange} 
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add Car</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCars;







// import React, { useContext } from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import axios from 'axios';
// import { userContext } from '../Context/UserContext';
// import Loading from '../Components/Loading';


// const fetchCars = async () => {
//   const { data } = await axios.get('https://backend-car-rentals.vercel.app/cars');
//   return data;
// };

// const fetchBrands = async () => {
//   const { data } = await axios.get('https://backend-car-rentals.vercel.app/brand');
//   return data;
// };

// const AdminDashboard = () => {
//   const queryClient = useQueryClient();
//   const { userToken  } = useContext(userContext);


//   // Fetch cars and brands
//   const { data: cars, isLoading: carsLoading, error: carsError , isError: carsIsError } = useQuery('cars', fetchCars);
//   const { data: brands, isLoading: brandsLoading, error: brandsError , isError: brandsIsError } = useQuery('brands', fetchBrands);

//   // Create Car mutation
//   const createCarMutation = useMutation(
//     async (newCar) => await axios.post('https://backend-car-rentals.vercel.app/cars', newCar , {
//       headers: {
//         'token': `${userToken}`,  // Update here to match backend expectations
//       }}),
//     {
//       onSuccess: () => queryClient.invalidateQueries('cars'),
//     }
//   );

//   // Delete Car mutation
//   const deleteCarMutation = useMutation(
//     async (carId) => await axios.delete(`https://backend-car-rentals.vercel.app/cars/${carId}` , {
//       headers: {
//         'token': `${userToken}`,  // Update here to match backend expectations
//       }}),
//     {
//       onSuccess: () => queryClient.invalidateQueries('cars'),
//     }
//   );

//   // Create Brand mutation
//   const createBrandMutation = useMutation(
//     async (newBrand) => await axios.post('https://backend-car-rentals.vercel.app/brand', newBrand, {
//       headers: {
//         'token': `${userToken}`,  // Update here to match backend expectations
//       }}), 
//     {
//       onSuccess: () => queryClient.invalidateQueries('brands'),
//     }
//   );

//   // Delete Brand mutation
//   const deleteBrandMutation = useMutation(
//     async (brandId) => await axios.delete(`https://backend-car-rentals.vercel.app/brands/${brandId}` , {
//       headers: {
//         'token': `${userToken}`,  // Update here to match backend expectations
//       }}),
//     {
//       onSuccess: () => queryClient.invalidateQueries('brands'),
//     }
//   );

//   // Handlers for creating car, deleting car, creating brand, deleting brand
//   const handleCreateCar = (newCar) => {
//     createCarMutation.mutate(newCar);
//   };

//   const handleDeleteCar = (carId) => {
//     deleteCarMutation.mutate(carId);
//   };

//   const handleCreateBrand = (newBrand) => {
//     createBrandMutation.mutate(newBrand);
//   };

//   const handleDeleteBrand = (brandId) => {
//     deleteBrandMutation.mutate(brandId);
//   };

//   if (carsLoading || brandsLoading) return <Loading/>;
// if(carsIsError ) return carsError.message
// if(brandsIsError ) return brandsError.message
//   return (
//     <div className="container my-5">
//       <h2>Admin Dashboard</h2>
      
//       <div className="row">
//         {/* Cars Management */}
//         <div className="col-md-6">
//           <h3>Cars Management</h3>
//           <ul className="list-group mb-3">
//             {cars.map((car) => (
//               <li key={car._id} className="list-group-item d-flex justify-content-between align-items-center">
//                 {car.brand.name} {car.model}
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteCar(car._id)}
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <button
//             className="btn btn-primary"
//             onClick={() => handleCreateCar({
//               model: 'New Car Model', 
//               brand: brands[0]._id, 
//               year: 2023, 
//               pricePerDay: 50,
//               availability: true,
//               image: {
//                 secure_url: '',
//                 public_id: ''
//               }
//             })}
//           >
//             Add New Car
//           </button>
//         </div>

//         {/* Brands Management */}
//         <div className="col-md-6">
//           <h3>Brands Management</h3>
//           <ul className="list-group mb-3">
//             {brands.map((brand) => (
//               <li key={brand._id} className="list-group-item d-flex justify-content-between align-items-center">
//                 {brand.name}
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteBrand(brand._id)}
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <button
//             className="btn btn-primary"
//             onClick={() => handleCreateBrand({
//               name: 'New Brand Name'
//             })}
//           >
//             Add New Brand
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
