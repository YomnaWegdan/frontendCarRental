import React, { useContext , } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import Loading from '../Components/Loading';
import { userContext } from '../Context/UserContext';

// const fetchUserBookings = async () => {

//   const { data } = await axios.get('https://backend-car-rentals.vercel.app/booking' , {
//     headers: {
//       'token': `${userToken}`,  // Update here to match backend expectations
//     },
//   });
//   return data;
// };

const Profile = () => {
  const { userToken  } = useContext(userContext);

  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  }, [userToken, navigate]);
   
  const { isLoading, error , isError, data: bookings } = useQuery('userBookings', () =>
    axios.get('https://backend-car-rentals.vercel.app/booking' , {
      headers: {
        'token': `${userToken}`,  // Update here to match backend expectations
      }
    }).then(res => res.data));

  if (isLoading) return<Loading/>
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="container my-5 min-vh-100">
      <h2 className='main-color py-5 text-center'>My Bookings</h2>
      <div className='row'>

      {bookings.map((booking) => (
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

export default Profile;
