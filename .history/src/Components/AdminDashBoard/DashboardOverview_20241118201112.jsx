

import React, { useContext } from "react";
import 'chart.js/auto';  
import { useQuery } from "react-query";
import axios from "axios";
import { userContext } from "../../Context/UserContext";
import Loading from "../Loading";  
import { Bar, Line, Pie } from "react-chartjs-2";

// Function to fetch dashboard data from your API
const fetchDashboardData = async (userToken) => {
  const config = {
    headers: {
      token: `${userToken}`,
    },
  };

  // Fetch all required data from your API
  const carsRes = await axios.get("https://backend-car-rentals.vercel.app/cars/count", config);
  const bookingsRes = await axios.get("https://backend-car-rentals.vercel.app/booking/count", config);
  const brandsRes = await axios.get("https://backend-car-rentals.vercel.app/brand/count", config);

  return {
    totalCars: carsRes.data.totalCars,
    totalBookings: bookingsRes.data.totalBookings,
    totalBrands: brandsRes.data.totalBrands,
    // You can add other necessary data like revenue if you have such an API endpoint
  };
};

const DashboardOverview = () => {
  const { userToken } = useContext(userContext);

  // Use react-query to fetch the dashboard data
  const { data, error, isLoading, isError } = useQuery(
    "dashboardData",
    () => fetchDashboardData(userToken),
  );
  console.log(data)

  // Show loading spinner while data is being fetched
  if (isLoading) return <Loading />;

  // Handle errors in fetching data
  if (isError) return <div>Error fetching dashboard data: {error.message}</div>;

  // Destructure fetched data
  const { totalCars, totalBookings, totalBrands } = data;

  // Sample data for chart (You may want to replace this with dynamic data)
  const chartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Bookings",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [12, 19, 3, 5, 2, 3, 9],  // Example data, you may want to fetch this as well
      },
    ],
  };

  return (
    <div className="dashboard-overview">
      {/* Widgets Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Total Cars Available</h5>
              <p className="text-muted">{totalCars} Cars</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Total Bookings</h5>
              <p className="text-muted">{totalBookings} Bookings</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Total Brands</h5>
              <p className="text-muted">{totalBrands} Brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Bookings Trend</h5>
              <Bar data={chartData} />
            </div>
          </div>
        </div>
      </div>

      {/* Add other sections like recent activities or revenue if needed */}
    </div>
  );
};

export default DashboardOverview;



