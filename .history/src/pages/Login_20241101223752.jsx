// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post('/users/login', { email, password });
//             localStorage.setItem('authToken', data.token);
//             alert('Login successful');
//             navigate('/');
//         } catch (error) {
//             console.error('Login error', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Login</h1>
//             <form onSubmit={handleLogin}>
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
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;

import axios from "axios";
import { useFormik } from "formik";
import React, { Fragment, useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../Context/UserContext";

export default function Login() {
  const [apiError, serApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let { setUserToken , setUserId } = useContext(userContext);

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  async function loginSubmit(values) {
    setLoading(true);
    try {
      let response = await axios.post(
        `https://backend-car-rentals.vercel.app/auth/signin`,
        values
      );
      const data = response.data;
      console.log(data);

      if (data.message === "success") {
        setLoading(false);
      

        setUserToken(data.token);
        setUserId(data.user._id);


        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userId", data.userId);
        

        console.log(data.token);
        console.log(data.user._id);
        navigate('/');
        console.log('Login success');
      } else {
        serApiError("Invalid credentials");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      serApiError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  }

  return (
    <Fragment>
      <section className="vh-100">
        <div className="container h-100">
        <h2 className='text-center mt-5 mb-5 pt-5 main-color fw-bold'>Login Now:</h2>
        <div className='login row justify-content-center align-items-center align-content-center h-75 w-75 mx-auto p-5 rounded-end-pill shadow'>
              <form onSubmit={formik.handleSubmit}>
                {apiError && (
                  <div className="alert alert-danger p-2">{apiError}</div>
                )}

                <input
                  className="form-control border-top-0 border-start-0 border-end-0 border-bottom-3 mt-4"
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

                <div >
                  {loading ? (
                    <button type="button" className="btn bg-main text-white">
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
                    <>
                      <button
                        type="submit"
                        disabled={!(formik.dirty && formik.isValid)}
                        className="btn btn-main w-100"
                      >
                        Login
                      </button>
                
                    </>
                  )}
                    <div className="d-flex justify-content-between mt-3">
                    <NavLink to="/forgetPassword" className=" text-decoration-none main-color">
                        Forget Password?
                      </NavLink>
                  <NavLink to={"/register"} className=" text-decoration-none main-color">
                    Register Now
                  </NavLink>
                </div></div>
              </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
