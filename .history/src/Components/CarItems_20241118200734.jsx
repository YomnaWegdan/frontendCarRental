import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from './Loading';

const CarItems = () => {

  const { isLoading, isError, error, data } = useQuery('getCars', () =>
    axios.get('https://backend-car-rentals.vercel.app/cars').then(res => res.data)
  );

  if (isLoading) return <Loading/>;
  if (isError) return <p>{error.message}</p>;
  return (
    <section id="carsItem" className='px-4 pt-3'>
      <div className="container my-5">
        <h2 className="text-center mb-4">Our Cars</h2>
        <div className="row ">
          {data && data.map((car) => (
            <div className="col-md-4 mb-4" key={car._id}>
              <div className="card card-item h-100 border-0 shadow">
                <NavLink to={`/cars/${car._id}`} className="card-img-top text-decoration-none main-color">
                  <img src={car.image.secure_url} alt={car.model} className="w-100 object-fit-cover" height={250} />
                  <h3 className="h5 px-2">{car.model.split(' ').splice(0, 2).join(' ')} {car.year}</h3>
                  <div className="d-flex justify-content-between align-items-center py-3 font-sm px-2">
                    <span className="text-main font-sm">{car.brand.name}</span>
                    <span className="text-main">{car.pricePerDay}$ /day</span>
                  </div>
                  </NavLink>

                  <button className="btn btn-main w-100" onClick={() => window.location.href = `/booking/${car._id}`}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarItems;





    // const [cars, setCars] = useState([]);

    // useEffect(() => {
    //   const fetchCars = async () => {
    //     try {
    //       const response = await axios.get('https://backend-car-rentals.vercel.app/cars'); 
    //       console.log(response)
    //       setCars(response.data);
    //       console.log(cars);

    //     } catch (error) {
    //       console.error('Error fetching cars:', error);
    //     }
    //   };
  
    //   fetchCars();
    // }, []);
  