// import axios from "axios";
// import { useContext, useState } from "react";
// import { useMutation, useQuery } from "react-query";
// import { userContext } from "../../Context/UserContext";
// import { toast } from "react-toastify";
// import Loading from "../Loading";

// const ManageBooking = () => {
//   const { userToken } = useContext(userContext);

//   const [showModal, setShowModal] = useState(false);
//   const [newBooking, setNewBooking] = useState({
//     car: "",
//     user: "",
//     startDate: "",
//     endDate: "",
//     status: "confirmed",
//   });
//   const [bookingToUpdate, setBookingToUpdate] = useState(null); // Track booking for updating

//   // Fetch bookings
//   const { data: bookings, refetch, isLoading, isError, error } = useQuery("bookings", () =>
//     axios.get("https://backend-car-rentals.vercel.app/booking", { headers: { token: `${userToken}` } }).then((res) => res.data)
//   );

//   // Fetch cars
//   const { data: cars } = useQuery("cars", () =>
//     axios.get("https://backend-car-rentals.vercel.app/cars").then((res) => res.data)
//   );

//   // Fetch users
//   const { data: users } = useQuery("users", () =>
//     axios.get("https://backend-car-rentals.vercel.app/auth", { headers: { token: `${userToken}` } }).then((res) => res.data)
//   );

//   // Mutation to create or update a booking
//   const bookingMutation = useMutation(
//     async ({ bookingId, bookingData }) =>
//       bookingId
//         ? axios.put(`https://backend-car-rentals.vercel.app/booking/${bookingId}`, bookingData, {
//             headers: { token: `${userToken}` },
//           })
//         : axios.post("https://backend-car-rentals.vercel.app/booking", bookingData, {
//             headers: { token: `${userToken}` },
//           }),
//     {
//       onSuccess: () => {
//         refetch();
//         setShowModal(false);
//         toast(bookingToUpdate ? "Booking updated successfully!" : "Booking added successfully!");
//         setBookingToUpdate(null);
//       },
//       onError: (error) => {
//         console.error("Error:", error);
//         toast("Failed to process request. Please try again.");
//       },
//     }
//   );

//   const handleCreate = () => {
//     setNewBooking({ car: "", user: "", startDate: "", endDate: "", status: "confirmed" });
//     setBookingToUpdate(null);
//     setShowModal(true);
//   };

//   const handleUpdate = (bookingId) => {
//     const booking = bookings.find((b) => b._id === bookingId);
//     if (!booking) {
//       toast("Booking not found.");
//       return;
//     }
//     setNewBooking({
//       car: booking.car._id,
//       user: booking.user._id,
//       startDate: booking.startDate,
//       endDate: booking.endDate,
//       status: booking.status,
//     });
//     setBookingToUpdate(booking);
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//   };

//   const handleSubmit = () => {
//     if (!newBooking.car || !newBooking.user || !newBooking.startDate || !newBooking.endDate) {
//       toast("Please fill out all fields.");
//       return;
//     }

//     const bookingData = {
//       car: newBooking.car,
//       user: newBooking.user,
//       startDate: newBooking.startDate,
//       endDate: newBooking.endDate,
//       status: newBooking.status,
//     };

//     bookingMutation.mutate({ bookingId: bookingToUpdate?._id, bookingData });
//   };

//   const handleChange = (e) => {
//     setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
//   };


//   const deleteBooking = async (id) => {
//     try {
//       const response = await axios.delete(`https://backend-car-rentals.vercel.app/booking/${id}`, {
//         headers: {
//           token: `${userToken}`,
//         },
//       });
//       console.log(response); // Log the response object
//       refetch();
//       toast("Booking deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting Booking:", error.response || error.message); // Log the error message or response
//       if (error.response) {
//         console.error("Error response data:", error.response.data); // More details from the backend
//         console.error("Error status:", error.response.status); // Status code from the response
//       }
//       toast("Failed to delete Booking. Please try again.");
//     }
//   };
  

//   // const cancelBooking = async (id) => {
    
//   //     try {
//   //       const response = await axios.put(`https://backend-car-rentals.vercel.app/booking/${id}/cancel`, {
//   //         headers: {
//   //           token: `${userToken}`,
//   //         },
//   //       });
//   //     console.log(response); 

//   //     refetch();

//   //     toast("Booking cancelled successfully!");
//   //   } catch (error) {
//   //     console.error("Error cancel Booking:", error.response || error.message); // Log the error message or response
//   //     if (error.response) {
//   //       console.error("Error response data:", error.response.data); // More details from the backend
//   //       console.error("Error status:", error.response.status); // Status code from the response
//   //     }      toast("Failed to cancel booking. Please try again.");
//   //   }
//   // };
//   const cancelBooking = async (id) => {
//     try {
//       const response = await axios.put(
//         `https://backend-car-rentals.vercel.app/booking/${id}/cancel`,
//         {}, // Empty object for body if no body content is needed
//         {
//           headers: {
//             token: `${userToken}`,
//           },
//         }
//       );
//       console.log(response);
//       refetch();
//       toast("Booking cancelled successfully!");
//     } catch (error) {
//       console.error("Error cancel Booking:", error.response || error.message); // Log the error message or response
//       if (error.response) {
//         console.error("Error response data:", error.response.data); // More details from the backend
//         console.error("Error status:", error.response.status); // Status code from the response
//       }
//       toast("Failed to cancel booking. Please try again.");
//     }
//   };
  

//   if (isLoading) return <Loading />;
//   if (isError) return <div>{error.message}</div>;

//   return (
//     <div className="container">
//       <div className="row">
//         <table className="table mt-3">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Car</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Status</th>
//               <th colSpan={2}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings?.map((booking) => {
//               const user = users?.users?.find((u) => u._id === booking.user); // Find the user by ID
//               return (
//                 <tr key={booking._id}>
//                   <td>{user ? user.name : "Unknown User"}</td>
//                   <td>{booking.car?.model}</td>
//                   <td>{new Date(booking.startDate).toLocaleDateString()}</td>
//                   <td>{new Date(booking.endDate).toLocaleDateString()}</td>
//                   <td>{booking.status}</td>
//                   <td>
//                     <button className="btn btn-dark" onClick={() => handleUpdate(booking._id)}>
//                       Update
//                     </button>
//                   </td>
//                   <td>
//                     <button className="btn btn-danger" onClick={() => deleteBooking(booking._id)}>
//                       Delete
//                     </button>
//                     <button className="btn btn-danger ms-2" onClick={() => cancelBooking(booking._id)}> Cancel</button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <button className="btn btn-main mt-3 w-100 mx-auto" onClick={handleCreate}>
//           Add New Booking
//         </button>
//       </div>

//       <div className={`modal ${showModal ? "show d-block" : ""}`} tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">{bookingToUpdate ? "Update Booking" : "Add New Booking"}</h5>
//               <button type="button" className="btn-close" onClick={handleClose}></button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="car" className="form-label">Car</label>
//                   <select className="form-select" name="car" value={newBooking.car} onChange={handleChange}>
//                     <option value="">Select Car</option>
//                     {cars?.map((car) => (
//                       <option key={car._id} value={car._id}>
//                         {car.model}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="user" className="form-label">User</label>
//                   <select className="form-select" name="user" value={newBooking.user} onChange={handleChange}>
//                     <option value="">Select User</option>
//                     {Array.isArray(users?.users) && users?.users.map((user) => (
//                       <option key={user._id} value={user._id}>
//                         {user.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="startDate" className="form-label">Start Date</label>
//                   <input type="date" className="form-control" id="startDate" name="startDate" value={newBooking.startDate} onChange={handleChange} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="endDate" className="form-label">End Date</label>
//                   <input type="date" className="form-control" id="endDate" name="endDate" value={newBooking.endDate} onChange={handleChange} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="status" className="form-label">Status</label>
//                   <select className="form-select" name="status" value={newBooking.status} onChange={handleChange}>
//                     <option value="confirmed">Confirmed</option>
//                     <option value="pending">Pending</option>
//                     <option value="cancelled">Cancelled</option>
//                   </select>
//                 </div>
//               </form
//               > 
//             </div>
//             <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" onClick={handleClose}>
//               Close
//             </button>
//             <button type="button" className="btn btn-primary" onClick={handleSubmit}>
//               {bookingToUpdate ? "Update Booking" : "Create Booking"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// };

// export default ManageBooking;

import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { userContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import Loading from "../Loading";

const ManageBooking = () => {
  const { userToken } = useContext(userContext);
  const [showModal, setShowModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    car: "",
    user: "",
    startDate: "",
    endDate: "",
    status: "confirmed",
  });
  const [bookingToUpdate, setBookingToUpdate] = useState(null);

  const { data: bookings, refetch, isLoading, isError, error } = useQuery("bookings", () =>
    axios.get("https://backend-car-rentals.vercel.app/booking", { headers: { token: `${userToken}` } }).then((res) => res.data)
  );

  const { data: cars } = useQuery("cars", () =>
    axios.get("https://backend-car-rentals.vercel.app/cars").then((res) => res.data)
  );

  const { data: users } = useQuery("users", () =>
    axios.get("https://backend-car-rentals.vercel.app/auth", { headers: { token: `${userToken}` } }).then((res) => res.data)
  );

  const bookingMutation = useMutation(
    async ({ bookingId, bookingData }) => {
      if (bookingId) {
        return axios.put(`https://backend-car-rentals.vercel.app/booking/${bookingId}`, bookingData, {
          headers: { token: `${userToken}` },
        });
      }
      return axios.post("https://backend-car-rentals.vercel.app/booking", bookingData, {
        headers: { token: `${userToken}` },
      });
    },
    {
      onSuccess: () => {
        refetch();
        setShowModal(false);
        toast(bookingToUpdate ? "Booking updated successfully!" : "Booking added successfully!");
        setBookingToUpdate(null);
      },
      onError: (error) => {
        console.error("Error:", error);
        toast(`Failed to process request: ${error.response?.data?.message || "Please try again."}`);
      },
    }
  );

  const handleCreate = () => {
    setNewBooking({ car: "", user: "", startDate: "", endDate: "", status: "confirmed" });
    setBookingToUpdate(null);
    setShowModal(true);
  };

  const handleUpdate = (bookingId) => {
    const booking = bookings.find((b) => b._id === bookingId);
    if (!booking) {
      toast("Booking not found.");
      return;
    }
    setNewBooking({
      car: booking.car._id,
      user: booking.user._id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      status: booking.status,
    });
    setBookingToUpdate(booking);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    const { car, user, startDate, endDate } = newBooking;
    if (!car || !user || !startDate || !endDate) {
      toast("Please fill out all fields.");
      return;
    }

    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      toast("Start date must be before end date.");
      return;
    }

    const bookingData = {
      car,
      user,
      startDate,
      endDate,
      status: newBooking.status,
    };

    bookingMutation.mutate({ bookingId: bookingToUpdate?._id, bookingData });
  };

  const handleChange = (e) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`https://backend-car-rentals.vercel.app/booking/${id}`, {
          headers: { token: `${userToken}` },
        });
        refetch();
        toast("Booking deleted successfully!");
      } catch (error) {
        console.error("Error deleting Booking:", error);
        toast(`Failed to delete Booking: ${error.response?.data?.message || "Please try again."}`);
      }
    }
  };

  const cancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.put(`https://backend-car-rentals.vercel.app/booking/${id}/cancel`, {}, {
          headers: { token: `${userToken}` },
        });
        refetch();
        toast("Booking cancelled successfully!");
      } catch (error) {
        console.error("Error canceling Booking:", error);
        toast(`Failed to cancel Booking: ${error.response?.data?.message || "Please try again."}`);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <table className="table mt-3 table-responsive">
            <thead>
              <tr>
                <th>User</th>
                <th>Car</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => {
                const user = users?.users?.find((u) => u._id === booking.user);
                return (
                  <tr key={booking._id}>
                    <td>{user ? user.name : "Unknown User"}</td>
                    <td>{booking.car?.model}</td>
                    <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button className="btn btn-dark" onClick={() => handleUpdate(booking._id)}>
                        Update
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteBooking(booking._id)}>
                        Delete
                      </button>
                      <button className="btn btn-danger ms-2" onClick={() => cancelBooking(booking._id)}> Cancel</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="btn btn-main mt-3 w-100" onClick={handleCreate}>
            Add New Booking
          </button>
        </div>
      </div>

      <div className={`modal ${showModal ? "show d-block" : ""}`} tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{bookingToUpdate ? "Update Booking" : "Add New Booking"}</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="car" className="form-label">Car</label>
                  <select className="form-select" name="car" value={newBooking.car} onChange={handleChange}>
                    <option value="">Select Car</option>
                    {cars?.map((car) => (
                      <option key={car._id} value={car._id}>
                        {car.model}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">User</label>
                  <select className="form-select" name="user" value={newBooking.user} onChange={handleChange}>
                    <option value="">Select User</option>
                    {Array.isArray(users?.users) && users.users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <input type="date" className="form-control" name="startDate" value={newBooking.startDate} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">End Date</label>
                  <input type="date" className="form-control" name="endDate" value={newBooking.endDate} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select className="form-select" name="status" value={newBooking.status} onChange={handleChange}>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                {bookingToUpdate ? "Update Booking" : "Add Booking"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
