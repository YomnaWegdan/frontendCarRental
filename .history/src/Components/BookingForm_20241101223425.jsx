import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext } from 'react';
import { userContext } from '../Context/UserContext';
import { useMutation } from 'react-query';

const BookingForm = () => {
  const [apiError , setApiError] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();
  const { userToken , userId } = useContext(userContext);
  console.log(userId)

  let navigate = useNavigate();

  // Check if the user is logged in
  if (!userId) {
    // Redirect to login if not logged in
    navigate('/login');
    return null; // or a loading spinner
  }


  const validationSchema = Yup.object({
    startDate: Yup.date()
      .required('Start Date is required')
      .min(new Date(), 'Start Date cannot be in the past'),
    endDate: Yup.date()
      .required('End Date is required')
      .min(Yup.ref('startDate'), 'End Date cannot be before Start Date'),
  });

  // Define the mutation using React Query
  const mutation = useMutation(
    (newBooking) => axios.post('https://backend-car-rentals.vercel.app/booking', newBooking, {
      headers: {
        'token': `${userToken}`,  // Update here to match backend expectations
      },
    }),
    {
      onSuccess: () => {
        // Navigate to profile on success
        navigate('/profile');
      },
      onError: (error) => {
        console.error('Error booking the car:', error.response?.data || error.message);
        setApiError(error.response?.data || error.message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        car: id,         
        user:userId,    
        ...values,
      });
    },
  });

  return (
    <div className="container py-5 vh-100">
      <div className="row justify-content-center align-items-center h-100">
        <h2 className='main-color mt-5'>Book a Car</h2>
        <form onSubmit={formik.handleSubmit}  className='card border-0 shadow p-5'>
        {apiError && (
          <div className="alert alert-danger p-2">{apiError}</div>
        )}
          <div className="form-group mb-3">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className={`form-control ${formik.touched.startDate && formik.errors.startDate ? 'is-invalid' : ''}`}
              id="startDate"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <div className="invalid-feedback">{formik.errors.startDate}</div>
            ) : null}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              className={`form-control ${formik.touched.endDate && formik.errors.endDate ? 'is-invalid' : ''}`}
              id="endDate"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.endDate && formik.errors.endDate ? (
              <div className="invalid-feedback">{formik.errors.endDate}</div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-main" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Booking...' : 'Book Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
/*
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
*/

// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useContext } from 'react';
// import { userContext } from '../Context/UserContext';  // Adjust path as necessary
// import { useMutation } from 'react-query';

// const BookingForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { userToken } = useContext(userContext);  // Get the token from context


//   const validationSchema = Yup.object({
//     startDate: Yup.date()
//       .required('Start Date is required')
//       .min(new Date(), 'Start Date cannot be in the past'),
//     endDate: Yup.date()
//       .required('End Date is required')
//       .min(Yup.ref('startDate'), 'End Date cannot be before Start Date'),
//   });

//   // Define the mutation using React Query
//   const mutation = useMutation(
//     (newBooking) => axios.post('https://backend-car-rentals.vercel.app/booking', newBooking, {
//       headers: {
//         'token': `${userToken}`,  // Update here to match backend expectations
//       },
//     }),
//     {
//       onSuccess: () => {
//         // Navigate to profile on success
//         navigate('/profile');
//       },
//       onError: (error) => {
//         console.error('Error booking the car:', error.response?.data || error.message);
//       },
//     }
//   );

//   const formik = useFormik({
//     initialValues: {
//       startDate: '',
//       endDate: '',
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       mutation.mutate({
//         car: id,
//         ...values,
//       });
//     },
//   });

//   return (
//     <div className="container py-5 vh-100">
//       <div className="row justify-content-center align-items-center h-100">
//         <h2 className='main-color mt-5'>Book a Car</h2>
//         <form onSubmit={formik.handleSubmit} className='card border-0 shadow p-5'>
//           <div className="form-group mb-3">
//             <label htmlFor="startDate">Start Date</label>
//             <input
//               type="date"
//               className={`form-control ${formik.touched.startDate && formik.errors.startDate ? 'is-invalid' : ''}`}
//               id="startDate"
//               name="startDate"
//               value={formik.values.startDate}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.startDate && formik.errors.startDate ? (
//               <div className="invalid-feedback">{formik.errors.startDate}</div>
//             ) : null}
//           </div>

//           <div className="form-group mb-3">
//             <label htmlFor="endDate">End Date</label>
//             <input
//               type="date"
//               className={`form-control ${formik.touched.endDate && formik.errors.endDate ? 'is-invalid' : ''}`}
//               id="endDate"
//               name="endDate"
//               value={formik.values.endDate}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.endDate && formik.errors.endDate ? (
//               <div className="invalid-feedback">{formik.errors.endDate}</div>
//             ) : null}
//           </div>

//           <button type="submit" className="btn btn-main" disabled={mutation.isLoading}>
//             {mutation.isLoading ? 'Booking...' : 'Book Now'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;


// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useContext } from 'react';
// import { userContext } from '../Context/UserContext';  // Adjust path as necessary

// const BookingForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { userToken } = useContext(userContext);  // Get the token from context

//   console.log(userToken)

//   const validationSchema = Yup.object({
//     startDate: Yup.date()
//       .required('Start Date is required')
//       .min(new Date(), 'Start Date cannot be in the past'),
//     endDate: Yup.date()
//       .required('End Date is required')
//       .min(Yup.ref('startDate'), 'End Date cannot be before Start Date'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       startDate: '',
//       endDate: '',
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post('https://backend-car-rentals.vercel.app/booking', {
//           car: id,
//           ...values,
//         }, {
//          headers:{
//           'Authorization': `${userToken}`
//         }
//         });

//         console.log('Booking response:', response);
//         navigate('/profile');
//       } catch (error) {
//         console.error('Error booking the car:', error.response?.data || error.message);
//       }
//     },
//   });

//   return (
//     <div className="container py-5 vh-100">
//       <div className="row justify-content-center align-items-center h-100">
//         <h2 className='main-color mt-5'>Book a Car</h2>
//         <form onSubmit={formik.handleSubmit} className='card border-0 shadow p-5'>
//           <div className="form-group mb-3">
//             <label htmlFor="startDate">Start Date</label>
//             <input
//               type="date"
//               className={`form-control ${formik.touched.startDate && formik.errors.startDate ? 'is-invalid' : ''}`}
//               id="startDate"
//               name="startDate"
//               value={formik.values.startDate}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.startDate && formik.errors.startDate ? (
//               <div className="invalid-feedback">{formik.errors.startDate}</div>
//             ) : null}
//           </div>

//           <div className="form-group mb-3">
//             <label htmlFor="endDate">End Date</label>
//             <input
//               type="date"
//               className={`form-control ${formik.touched.endDate && formik.errors.endDate ? 'is-invalid' : ''}`}
//               id="endDate"
//               name="endDate"
//               value={formik.values.endDate}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.endDate && formik.errors.endDate ? (
//               <div className="invalid-feedback">{formik.errors.endDate}</div>
//             ) : null}
//           </div>

//           <button type="submit" className="btn btn-main">
//             Book Now
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;



// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';

// const BookingForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Form validation schema using Yup
//   const validationSchema = Yup.object({
//     startDate: Yup.date()
//       .required('Start Date is required')
//       .min(new Date(), 'Start Date cannot be in the past'),
//     endDate: Yup.date()
//       .required('End Date is required')
//       .min(Yup.ref('startDate'), 'End Date cannot be before Start Date'),
//   });

//   // Formik form handling
//   const formik = useFormik({
//     initialValues: {
//       startDate: '',
//       endDate: '',
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//         console.log(values)
//       try {
//         // Send the form data to the backend
//         await axios.post('https://backend-car-rentals.vercel.app/booking', {
//           car: id,
//           ...values,
//         });

//         // Redirect to the profile page after booking
//         navigate('/profile');
//       } catch (error) {
//         console.error('Error booking the car:', error);
//       }
//     },
//   });

//   return ( 
//     <div className="container py-5 vh-100">
//       <div className="row justify-content-center align-items-center align-content-center h-100 ">
//       <h2 className=' main-color mt-5'>Book a Car</h2>
//       <form onSubmit={formik.handleSubmit} className='card border-0 shadow p-5 '>
//         <div className="form-group mb-3">
//           <label htmlFor="startDate">Start Date</label>
//           <input
//             type="date"
//             className={`form-control ${formik.touched.startDate && formik.errors.startDate ? 'is-invalid' : ''}`}
//             id="startDate"
//             name="startDate"
//             value={formik.values.startDate}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.startDate && formik.errors.startDate ? (
//             <div className="invalid-feedback">{formik.errors.startDate}</div>
//           ) : null}
//         </div>

//         <div className="form-group mb-3">
//           <label htmlFor="endDate">End Date</label>
//           <input
//             type="date"
//             className={`form-control ${formik.touched.endDate && formik.errors.endDate ? 'is-invalid' : ''}`}
//             id="endDate"
//             name="endDate"
//             value={formik.values.endDate}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.endDate && formik.errors.endDate ? (
//             <div className="invalid-feedback">{formik.errors.endDate}</div>
//           ) : null}
//         </div>

//         <button type="submit" className="btn btn-main">
//           Book Now
//         </button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default BookingForm;
