// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post('/users/register', { name, email, password });
//             localStorage.setItem('authToken', data.token);
//             alert('Registration successful');
//             navigate('/');
//         } catch (error) {
//             console.error('Registration error', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Register</h1>
//             <form onSubmit={handleRegister}>
//                 <label>Name</label>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//                 <label>Email</label>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <label>Password</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Register;

// /*
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import React, { Fragment, useState } from "react";
// import axios from "axios";
// import { ThreeDots } from "react-loader-spinner";
// import { NavLink, useNavigate } from "react-router-dom";

// export default function Register() {
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   let navigate = useNavigate()

//   let validationSchema = Yup.object({
//     name: Yup.string()
//       .required("name is required")
//       .min(3, "min length is 3")
//       .max(10, "Max length is 10"),
//     email: Yup.string().required("email is required").email("invalid email"),
//     password: Yup.string()
//       .required("password is required")
//       .matches(/^[A-Za-z][\w @]{5,9}$/, "invalid password ex(Ali@123)"),
//     rePassword: Yup.string()
//       .required("rePassword is required")
//       .oneOf([Yup.ref("password")], "rePassword not match with password"),
//     phone: Yup.string()
//       .required("phone is required")
//       .matches(/^01[0125][\d]{8}$/, "invalid phone"),
//   });

//   let formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       phone: "",
//     },
//     validationSchema,
//     onSubmit: registerSubmit,
//   });

//   async function registerSubmit(values) {
//     //method that send to database
//     console.log(formik);
//     console.log(values);
//     setLoading(true);
//     let { data } = await axios
//       .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
//       .catch((error) => {
//         setApiError(error.response.data.message);
//         setLoading(false);
//       });
//     console.log(data);
//     if (data.message === "success") {
//       setLoading(false);
//       navigate('/login')
//     }
//   }

//   return (
//     <Fragment>
//       <section className="register py-5  vh-100 ">
//         <div className="container h-100">
//         <div className="row g-5 h-100 align-items-center  align-content-center mt-2">
//           <div className="col-md-12 p-5 shadow">
//               <h3>Register Now:</h3>
//               <form onSubmit={formik.handleSubmit}>
//                 {apiError ? (
//                   <div className="alert alert-danger p-2">{apiError}</div>
//                 ) : (
//                   ""
//                 )}

//                 <input
//                   className=" form-control border-top-0 border-start-0 border-end-0  border-bottom-3 my-4"
//                   placeholder="userName"
//                   id="name"
//                   name="name"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.errors.name && formik.touched.name ? (
//                   <div className="alert alert-danger p-2">
//                     {formik.errors.name}
//                   </div>
//                 ) : (
//                   ""
//                 )}

//                 <input
//                   className=" form-control border-top-0 border-start-0 border-end-0  border-bottom-3 "
//                   placeholder="Email"
//                   name="email"
//                   type="email"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.errors.email && formik.touched.email ? (
//                   <div className="alert alert-danger p-2">
//                     {formik.errors.email}
//                   </div>
//                 ) : (
//                   ""
//                 )}

//                 <input
//                   className=" form-control border-top-0 border-start-0 border-end-0  border-bottom-3 my-4"
//                   placeholder="Password"
//                   name="password"
//                   type="password"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.errors.password && formik.touched.password ? (
//                   <div className="alert alert-danger p-2">
//                     {formik.errors.password}
//                   </div>
//                 ) : (
//                   ""
//                 )}

//                 <input
//                   className=" form-control border-top-0 border-start-0 border-end-0  border-bottom-3"
//                   placeholder="RePassword"
//                   name="rePassword"
//                   type="password"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.errors.rePassword && formik.touched.rePassword ? (
//                   <div className="alert alert-danger p-2">
//                     {formik.errors.rePassword}
//                   </div>
//                 ) : (
//                   ""
//                 )}

//                 <input
//                   className=" form-control border-top-0 border-start-0 border-end-0  border-bottom-3 my-4"
//                   placeholder="Phone"
//                   name="phone"
//                   type="tel"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.errors.phone && formik.touched.phone ? (
//                   <div className="alert alert-danger p-2">
//                     {formik.errors.phone}
//                   </div>
//                 ) : (
//                   ""
//                 )}

//                 <div className='d-flex justify-content-between'>
//                 {loading ? (
//                   <button type=" button" className="btn bg-main text-white ">
//                   <ThreeDots
//                   visible={true}
//                   height="25"
//                   width="25"
//                   color="white"
//                   radius="9"
//                   ariaLabel="three-dots-loading"
//                   wrapperStyle={{}}
//                   wrapperClass=""
//                   />                  </button>
//                 ) : (
//                   <button
//                     disabled={!(formik.dirty && formik.isValid)}
//                     className="btn bg-main text-white " type="button"
//                   >
//                     Register
//                   </button>
//                 )}
//                 <NavLink to={'/login'} className='text-main'>Login Now</NavLink>
//                 </div>

//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Fragment>
//   );
// }

// */
