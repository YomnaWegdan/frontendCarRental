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
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { Fragment, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "min length is 3")
      .max(10, "Max length is 10"),
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string().required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  async function registerSubmit(values) {
    console.log("Submitting form with values:", values);  // Debugging console log
    setLoading(true);
    try {
      let { data } = await axios.post(
        `https://backend-car-rentals.vercel.app/auth/signup`,
        values
      );
      console.log("Server response:", data);  // Debugging console log
      if (data.message === "success") {
        setLoading(false);
        navigate("/login");
      } else {
        setApiError(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error:", error.response?.data.message || error.message);  // Debugging console log
      setApiError(error.response?.data.message || error.message);
      setLoading(false);
    }
  }

  return (
    <Fragment>
    <section className="vh-100">
    <div className="container h-100">
    <h2 className='text-center mt-5 mb-5 pt-5 main-color fw-bold'>Register Now:</h2>
    <div className='register row justify-content-center align-items-center align-content-center h-75 w-75 mx-auto p-5 rounded-end-pill shadow'>
              <form onSubmit={formik.handleSubmit}>
                {apiError && (
                  <div className="alert alert-danger p-2">{apiError}</div>
                )}

                <input
                  className="form-control border-top-0 border-start-0 border-end-0 border-bottom-3 my-4"
                  placeholder="userName"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-danger p-2">
                    {formik.errors.name}
                  </div>
                ) : null}

                <input
                  className="form-control border-top-0 border-start-0 border-end-0 border-bottom-3"
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="alert alert-danger p-2">
                    {formik.errors.email}
                  </div>
                ) : null}

                <input
                  className="form-control border-top-0 border-start-0 border-end-0 border-bottom-3 my-4"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="alert alert-danger p-2">
                    {formik.errors.password}
                  </div>
                ) : null}

                <div className="d-flex justify-content-between">
                  {loading ? (
                    <button type="button" className="btn bg-main text-white ">
                      <ThreeDots
                        visible={true}
                        height="25"
                        width="25"
                        color="white"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </button>
                  ) : (
                    <button
                      disabled={!(formik.dirty && formik.isValid)}
                      className="btn bg-dark text-white"
                      type="submit"
                    >
                      Register
                    </button>
                  )}
                  <NavLink to="/login" className="text-main">
                    Login Now
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
