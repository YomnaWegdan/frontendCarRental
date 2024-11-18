// import React from "react";
// import { Outlet, Link } from "react-router-dom";

// const AdminDashboard = () => {
//   return (
//     <div className="container min-vh-100">
//       <div className="row  justify-content-between align-items-center mt-5 pt-5  ">
      
//             <div className='col-md-12 d-flex justify-content-center'>
//                 <Link to="brands" className="btn btn-main me-3 ">Manage Brands</Link>
//                 <Link to="cars" className="btn btn-main me-3  " >Manage Cars</Link>
//                 <Link to="bookings" className="btn btn-main   ">Manage Bookings</Link>
//             </div>
//           </div>
//         <div className="row">
//           <Outlet /> 
//         </div>
//       </div>
//   );
// };

// export default AdminDashboard;
import React, { useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import Loading from "../Loading";
import { userContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

// Fetching function for the dashboard stats
const fetchStats = async (userToken) => {
  const config = {
    headers: {
      token: `${userToken}`,  // Include token in all requests
    },
  };

  // Fetch data for brands, cars, and bookings
  const brandsRes = await axios.get("https://backend-car-rentals.vercel.app/brand/count", config);
  const carsRes = await axios.get("https://backend-car-rentals.vercel.app/cars/count", config);
  const bookingsRes = await axios.get("https://backend-car-rentals.vercel.app/booking/count", config);

  // Return all the required counts
  return {
    totalBrands: brandsRes.data.totalBrands,
    totalCars: carsRes.data.totalCars,
    totalBookings: bookingsRes.data.totalBookings,
  };
};

const AdminDashboard = () => {

  const { userToken } = useContext(userContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  }, [userToken, navigate]);
   

  // Use react-query's useQuery hook to fetch dashboard stats
  const { data, error, isError, isLoading } = useQuery(
    "dashboardStats",
    () => fetchStats(userToken), // Pass the userToken to fetchStats
  );

  // If data is still loading, show loading component
  if (isLoading) return <Loading />;

  // If there is an error, display the error message
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="container min-vh-100">
      <div className="row justify-content-between align-items-center mt-5 pt-5">
        <div className="col-md-2 bg-dark text-white p-3">
          <h4 className="text-center">Admin Panel</h4>
          <ul className="nav flex-column mt-4">
            <li className="nav-item mb-3">
              <Link to="overview" className="nav-link text-white">
                Dashboard Overview
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="brands" className="nav-link text-white">
                Manage Brands
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="cars" className="nav-link text-white">
                Manage Cars
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="bookings" className="nav-link text-white">
                Manage Bookings
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="users" className="nav-link text-white">
                Manage Users
              </Link>
            </li>
          
          </ul>
</div>    

      {/* Dashboard Overview */}
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Brands</h5>
              <p className="card-text">{data.totalBrands}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Cars</h5>
              <p className="card-text">{data.totalCars}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Bookings</h5>
              <p className="card-text">{data.totalBookings}</p>
            </div>
          </div>
        </div></div>

      <div className="row">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;


// import React from "react";
// import { Outlet, Link } from "react-router-dom";

// const AdminDashboard = () => {
//   return (
//     <div className="container-fluid min-vh-100">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-2 bg-dark text-white p-3">
//           <h4 className="text-center">Admin Panel</h4>
//           <ul className="nav flex-column mt-4">
//             <li className="nav-item mb-3">
//               <Link to="overview" className="nav-link text-white">
//                 Dashboard Overview
//               </Link>
//             </li>
//             <li className="nav-item mb-3">
//               <Link to="brands" className="nav-link text-white">
//                 Manage Brands
//               </Link>
//             </li>
//             <li className="nav-item mb-3">
//               <Link to="cars" className="nav-link text-white">
//                 Manage Cars
//               </Link>
//             </li>
//             <li className="nav-item mb-3">
//               <Link to="bookings" className="nav-link text-white">
//                 Manage Bookings
//               </Link>
//             </li>
//             <li className="nav-item mb-3">
//               <Link to="users" className="nav-link text-white">
//                 Manage Users
//               </Link>
//             </li>
//             <li className="nav-item mb-3">
//               <Link to="reports" className="nav-link text-white">
//                 Analytics/Reports
//               </Link>
//             </li>
//             <li className="nav-item mb-3">
//               <Link to="settings" className="nav-link text-white">
//                 Settings
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-10 p-5">
//           {/* Dashboard Widgets */}
//           <div className="row mb-4">
//             <div className="col-md-4">
//               <div className="card shadow-sm">
//                 <div className="card-body">
//                   <h5>Total Cars Available</h5>
//                   <p className="text-muted">50 Cars</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card shadow-sm">
//                 <div className="card-body">
//                   <h5>Total Bookings This Week</h5>
//                   <p className="text-muted">120 Bookings</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card shadow-sm">
//                 <div className="card-body">
//                   <h5>Total Revenue This Month</h5>
//                   <p className="text-muted">$20,000</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Dynamic Content from Outlet */}
//           <div className="row">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

