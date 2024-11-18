import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import Home from "./pages/Home.jsx";
import CarDetail from "./pages/CarDetails.jsx";
import Booking from "./pages/Booking.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { useContext, useEffect } from "react";
import { userContext } from "./Context/UserContext.js";
import CarItems from "./Components/CarItems.jsx";
import Profile from "./pages/Profile.jsx";
import BookingForm from "./Components/BookingForm.jsx";
import Brand from "./pages/Brand.jsx";
import AdminDashboard from "./Components/AdminDashBoard/AdminDashboard.jsx";
import { ManageBrands } from "./Components/AdminDashBoard/ManageBrands.jsx";
import { ManageCars } from "./Components/AdminDashBoard/ManageCars.jsx";
import { ToastContainer } from "react-toastify";
import Contact from "./pages/Contact.jsx";
import ManageBookings from "./Components/AdminDashBoard/MangeBooking.jsx";
import DashboardOverview from "./Components/AdminDashBoard/DashboardOverview.jsx";

function App() {
  let { setUserToken } = useContext(userContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/cars" element={<CarItems />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/brands" element={<Brand />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<AdminDashboard />}>
        <Route path="/admin/overview" element={<DashboardOverview />} />

          <Route path="brands" element={<ManageBrands />} />
          <Route path="cars" element={<ManageCars />} />
          <Route path="/admin/bookings" element={<ManageBookings />} />

          <Route path="/admin/bookings" element={<ManageBookings />} />


          
        </Route>

        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


// import { Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";

// import "./App.css";
// import Footer from "./Components/Footer.jsx";
// import Header from "./Components/Header.jsx";
// import Home from "./pages/Home.jsx";
// import CarDetail from "./pages/CarDetails.jsx";
// import Booking from "./pages/Booking.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import { useContext, useEffect } from "react";
// import { userContext } from "./Context/UserContext.js";
// import CarItems from "./Components/CarItems.jsx";
// import Profile from "./pages/Profile.jsx";
// import BookingForm from "./Components/BookingForm.jsx";
// import Brand from "./pages/Brand.jsx";
// import AdminDashboard from "./Components/AdminDashBoard/AdminDashboard.jsx";
// import { ManageBrands } from "./Components/AdminDashBoard/ManageBrands.jsx";
// import { ManageCars } from "./Components/AdminDashBoard/ManageCars.jsx";
// import { ToastContainer } from "react-toastify";
// import Contact from "./pages/Contact.jsx";

// function App() {
//   let { setUserToken } = useContext(userContext);
//   useEffect(() => {
//     if (localStorage.getItem("userToken")) {
//       setUserToken(localStorage.getItem("userToken"));
//     }
//   }, []);
//   return (
//     <Router>
//       <Header />
//       <ToastContainer/>
//       <Routes>
//         <Route path="/" element={<Home />} exact />
//         <Route path="/cars" element={<CarItems />} />
//         <Route path="/cars/:id" element={<CarDetail />} />
//         <Route path="/booking/:id" element={<BookingForm />} />
//         <Route path="/brands" element={<Brand />} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<Profile />} />

//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/brands" element={<ManageBrands />} />
//         <Route path="/admin/cars" element={<ManageCars />} />

//         <Route path="/contact" element={<Contact />} />



//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

/*                    <Route path="/booking/:carId" element={<Booking/>} />
 */
