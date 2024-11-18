import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../Components/Loading';

const fetchCarDetails = async (id) => {
    const { data } = await axios.get(`https://backend-car-rentals.vercel.app/cars/${id}`);
    return data;
};

const CarDetail = () => {
    const { id } = useParams();
    

    // Use react-query to fetch car details
    const { isLoading, isError , error, data: car } = useQuery(['carDetails', id], () => fetchCarDetails(id), {
        retry: false, // Optional: disable retry on failure
    });

    if (isLoading) return <Loading/>
    

    if (isError) return <p>{error.message}</p>

    return (
        <div className="container min-vh-100">
            <div className="row justify-content-center align-items-center h-100">
                <div className='col-md-6'>
                    <Carousel>
                        {car.coverImages.map((image, index) => 
                            <img src={image.secure_url} alt={car.model} key={index} className="w-100" />
                        )}
                    </Carousel>
                </div>
                <div className='col-md-6 h-100 d-flex align-items-center'>
                    <div className='card border-0 shadow p-5 h-75 w-100 row align-items-center justify-content-center'>
                        <h3 className="h5">{car.model}</h3>

                        <h3>Price: {car.pricePerDay}$ / day</h3>
                        <p>Year: {car.year}</p>
                        <button className="btn btn-main w-100" onClick={() => window.location.href = `/booking/${car._id}`}>Book Now</button>

                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import { useParams } from 'react-router-dom';

// const CarDetail = () => {
//     const { id } = useParams();
//     const [car, setCar] = useState({
//         coverImages: [],
//         brand: { name: '' },
//         model: '',
//         pricePerDay: 0,
//     });

//     useEffect(() => {
//         const fetchCarDetails = async () => {
//             try {
//                 const { data } = await axios.get(`https://backend-car-rentals.vercel.app/cars/${id}`);
//                 setCar(data);
//             } catch (error) {
//                 console.error('Error fetching car details:', error);
//             }
//         };
//         fetchCarDetails();
//     }, [id]);

//     return (
//         <div className="container vh-100">
//             <div className="row justify-content-center align-items-center h-100">
//                 <div className='col-md-6'>
//                 <Carousel>
//                     {car.coverImages.map((image, index) => 
//                         <img src={image.secure_url} alt={car.model} key={index} className="w-100"/>
//                     )}</Carousel>
//                 </div>
//                 <div className='col-md-6 h-100 d-flex align-items-center '>
//                 <div className='card border-0 shadow p-5 h-75 w-100 row align-items-center justify-content-center' >
//                     <h3 className="h5">{car.model}</h3>
//                     <p className='py-3'>{car.brand.name}</p>
//                     <div className="d-flex justify-content-between align-items-center py-3 font-sm">
//                         <span>{car.pricePerDay} $</span>
//                     </div>
//                     <button className="btn btn-main  w-100">Booking Now</button>
//                 </div></div>
//             </div>
//         </div>
//     );
// };

// export default CarDetail;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const CarDetail = () => {
//     const { id } = useParams();
//     const [car, setCar] = useState({});

//     useEffect(() => {
//         const fetchCarDetails = async () => {
//             const {data} = await axios.get(`https://backend-car-rentals.vercel.app/cars/${id}`);
//             console.log(data)
//             setCar(data);
//         };
//         fetchCarDetails();
//     }, [id]);

//     return (
//         <>
//         <div className="container  vh-100 ">

//         <div className="row justify-content-center align-items-center h-100 ">
//             <div className='col-md-4'>
//                 {car.coverImages.map((image)=> 
//                     <img src={image.secure_url} alt={car.model} key={car._id} className="w-100"/>)}          
//             </div>
//           <div className='col-md-8'>
//           <h3 className="h5">{car.model}</h3>
//           <p className='py-3'>{car.brand.name}</p>
//           <div className="d-flex justify-content-between align-items-center py-3 font-sm">
//           <span>{car.pricePerDay} $</span>
//           </div>
//           <button className="btn bg-main text-main-light w-100">Add to cart</button>
//           </div>
//         </div>
//         </div>
//         </>
//     );
// };

// export default CarDetail;
