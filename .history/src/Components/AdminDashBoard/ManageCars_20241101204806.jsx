


// import axios from "axios";
// import { useContext, useState } from "react";
// import { useMutation, useQuery } from "react-query";
// import { userContext } from "../../Context/UserContext";
// import { toast } from "react-toastify";
// import Loading from "../Loading";

// export const ManageCars = () => {
//   const { userToken } = useContext(userContext);

//   const [showModal, setShowModal] = useState(false);
//   const [newCar, setNewCar] = useState({
//     model: "",
//     year: "",
//     pricePerDay: "",
//     brand: "",
//     mainImage: null,
//     coverImages: [],
//   });
//   // const [mainImage, setMainImage] = useState(null); // For the main image
//   // const [coverImages, setCoverImages] = useState([]); // For multiple cover images
//   const [carToUpdate, setCarToUpdate] = useState(null); // Track car for updating

//   // Fetch cars
//   const { data: cars, refetch, isLoading, isError, error } = useQuery("cars", () =>
//     axios.get("https://backend-car-rentals.vercel.app/cars").then((res) => res.data)
//   );

//   // Fetch brands
//   const { data: brands } = useQuery("brands", () =>
//     axios.get("https://backend-car-rentals.vercel.app/brand").then((res) => res.data)
//   );

//   // Mutation to create or update a car
//   const carMutation = useMutation(
//     async ({ formData, carId }) =>
//       carId
//         ? axios.put(`https://backend-car-rentals.vercel.app/cars/${carId}`, formData, {
//             headers: {
//               token: `${userToken}`,
//               "Content-Type": "multipart/form-data",
//             },
//           })
//         : axios.post("https://backend-car-rentals.vercel.app/cars", formData, {
//             headers: {
//               token: `${userToken}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }),
//     {
//       onSuccess: () => {
//         refetch();
//         setShowModal(false);
//         toast(carToUpdate ? "Car updated successfully!" : "Car added successfully!");
//         setCarToUpdate(null);
//       },
//       onError: (error) => {
//         console.error("Error:", error);
//         toast("Failed to process request. Please try again.");
//       },
//     }
//   );

//   const handleCreate = () => {
//     setNewCar({ model: "", year: "", pricePerDay: "", brand: "" , mainImage: null, coverImages: [] });
//     // setMainImage(null);
//     // setCoverImages([]);
//     setCarToUpdate(null);
//     setShowModal(true);
//   };

//   const handleUpdate = (carId) => {
//     const car = cars.find((c) => c._id === carId);
//     if (car) {
//         setNewCar({
//             model: car.model,
//             year: car.year,
//             pricePerDay: car.pricePerDay,
//             brand: car.brand._id,
//             mainImage: car.image?.secure_url || null,
//             coverImages: car.coverImages.map(image => image.secure_url) || [],
//         });
//         // setMainImage(car.image?.secure_url || null); // Set to current image or null
//         // setCoverImages(car.coverImages.map(image => image.secure_url) || []); // Extract URLs for cover images
//         setCarToUpdate(car); // Store car details for updating
//         setShowModal(true); // Open the modal
//     } else {
//         console.error('Car not found'); // Handle case where car is not found
//     }
// };





//   const handleClose = () => {
//     setShowModal(false);
//   };

//   // const handleSubmit = () => {
//   //   if (!newCar.model || !newCar.year || !newCar.pricePerDay || !newCar.brand || (!newCar.mainImage && !carToUpdate)) {
//   //     toast("Please fill out all fields and upload an image.");
//   //     return;
//   //   }

//   //   const formData = new FormData();
//   //   formData.append("model", newCar.model);
//   //   formData.append("year", newCar.year);
//   //   formData.append("pricePerDay", newCar.pricePerDay);
//   //   formData.append("brand", newCar.brand);

//   //   if (newCar.mainImage) {
//   //     formData.append("image", newCar.mainImage);
//   //   }

//   //   // Append cover images if any
//   //   if (newCar.coverImages.length > 0) {
//   //     newCar.coverImages.forEach((image) => {
//   //       formData.append(`coverImages`, image);
//   //     });
//   //   }

//   //   carMutation.mutate({ formData, carId: carToUpdate?._id });
//   // };

//   const handleSubmit = () => {
//     if (!newCar.model || !newCar.year || !newCar.pricePerDay || !newCar.brand || (!newCar.mainImage && !carToUpdate)) {
//       toast("Please fill out all fields and upload an image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("model", newCar.model);
//     formData.append("year", newCar.year);
//     formData.append("pricePerDay", newCar.pricePerDay);
//     formData.append("brand", newCar.brand);

//     if (newCar.mainImage instanceof File) {
//       formData.append("image", newCar.mainImage);
//     }

//     if (newCar.coverImages.length > 0) {
//       newCar.coverImages.forEach((image) => {
//         if (image instanceof File) {
//           formData.append(`coverImages`, image);
//         }
//       });
//     }

//     carMutation.mutate({ formData, carId: carToUpdate?._id });
// };

//   const handleChange = (e) => {
//     setNewCar({ ...newCar, [e.target.name]: e.target.value });
//   };

//   const handleMainImageChange = (e) => {
//     // setMainImage(e.target.files[0]);
//     setNewCar({ ...newCar, mainImage: e.target.files[0] });
//   };

//   const handleCoverImagesChange = (e) => {
//     // setCoverImages(Array.from(e.target.files)); // Handle multiple file uploads
//     setNewCar({ ...newCar, coverImages: Array.from(e.target.files) });
//   };

//   const deleteCar = async (id) => {
//     try {
//       const response = await axios.delete(`https://backend-car-rentals.vercel.app/cars/${id}`, {
//         headers: {
//           token: `${userToken}`,
//         },
//       });
//       console.log(response); // Log the response object
//       refetch();
//       toast("Car deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting car:", error.response || error.message); // Log the error message or response
//       if (error.response) {
//         console.error("Error response data:", error.response.data); // More details from the backend
//         console.error("Error status:", error.response.status); // Status code from the response
//       }
//       toast("Failed to delete car. Please try again.");
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
//               <th>Model</th>
//               <th>Year</th>
//               <th>Price Per Day</th>
//               <th>Brand</th>
//               <th>Images</th>
//               <th colSpan={2}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cars?.map((car) => (
//               <tr key={car._id}>
//                 <td>{car.model}</td>
//                 <td>{car.year}</td>
//                 <td>{car.pricePerDay}</td>
//                 <td>{car.brand?.name}</td>
//                 <td>
//                   <img src={car.image.secure_url} alt={car.model} className="w-25" height={50} />
//                 </td>
//                 <td>
//                   <button className="btn btn-dark" onClick={() => handleUpdate(car._id)}>
//                     Update
//                   </button>
//                 </td>
//                 <td>
//                   <button className="btn btn-danger" onClick={() => deleteCar(car._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button className="btn btn-main mt-3 w-100 mx-auto" onClick={handleCreate}>
//           Add New Car
//         </button>
//       </div>

//       {/* Modal */}
//       <div className={`modal ${showModal ? "show d-block" : ""}`} tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">{carToUpdate ? "Update Car" : "Add New Car"}</h5>
//               <button type="button" className="btn-close" onClick={handleClose}></button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="model" className="form-label">
//                     Model
//                   </label>
//                   <input type="text" className="form-control" id="model" name="model" value={newCar.model} onChange={handleChange} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="year" className="form-label">
//                     Year
//                   </label>
//                   <input type="number" className="form-control" id="year" name="year" value={newCar.year} onChange={handleChange} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="pricePerDay" className="form-label">
//                     Price Per Day
//                   </label>
//                   <input type="number" className="form-control" id="pricePerDay" name="pricePerDay" value={newCar.pricePerDay} onChange={handleChange} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="brand" className="form-label">
//                     Brand
//                   </label>
//                   <select className="form-select" name="brand" value={newCar.brand} onChange={handleChange}>
//                     <option value="">Select Brand</option>
//                     {brands?.map((brand) => (
//                       <option key={brand._id} value={brand._id}>
//                         {brand.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="mainImage" className="form-label">
//                     Main Image
//                   </label>
//                   <input type="file" className="form-control" id="mainImage" onChange={handleMainImageChange} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="coverImages" className="form-label">
//                     Cover Images
//                   </label>
//                   <input type="file" className="form-control" id="coverImages" onChange={handleCoverImagesChange} multiple />
//                 </div>
//               </form>
//                 </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={handleClose}>
//                 Close
//               </button>
//               <button type="button" className="btn btn-main" onClick={handleSubmit}>
//                 {carToUpdate ? "Update Car" : "Add Car"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageCars;

import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { userContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import Loading from "../Loading";

export const ManageCars = () => {
  const { userToken } = useContext(userContext);

  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState({
    model: "",
    year: "",
    pricePerDay: "",
    brand: "",
    mainImage: null,
    coverImages: [],
  });
  const [carToUpdate, setCarToUpdate] = useState(null); // Track car for updating

  // Fetch cars
  const { data: cars, refetch, isLoading, isError, error } = useQuery("cars", () =>
    axios.get("https://backend-car-rentals.vercel.app/cars").then((res) => res.data)
  );

  // Fetch brands
  const { data: brands } = useQuery("brands", () =>
    axios.get("https://backend-car-rentals.vercel.app/brand").then((res) => res.data)
  );

  // Mutation to create or update a car
  const carMutation = useMutation(
    async ({ formData, carId }) =>
      carId
        ? axios.put(`https://backend-car-rentals.vercel.app/cars/${carId}`, formData, {
            headers: {
              token: `${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          })
        : axios.post("https://backend-car-rentals.vercel.app/cars", formData, {
            headers: {
              token: `${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          }),
    {
      onSuccess: () => {
        refetch();
        setShowModal(false);
        toast(carToUpdate ? "Car updated successfully!" : "Car added successfully!");
        setCarToUpdate(null);
      },
      onError: (error) => {
        console.error("Error:", error);
        toast("Failed to process request. Please try again.");
      },
    }
  );

  const handleCreate = () => {
    setNewCar({ model: "", year: "", pricePerDay: "", brand: "", mainImage: null, coverImages: [] });
    setCarToUpdate(null);
    setShowModal(true);
  };

  const handleUpdate = (carId) => {
    const car = cars.find((c) => c._id === carId);
    if (car) {
      setNewCar({
        model: car.model,
        year: car.year,
        pricePerDay: car.pricePerDay,
        brand: car.brand._id,
        mainImage: car.image?.secure_url || null,
        coverImages: car.coverImages.map(image => image.secure_url) || [],
      });
      setCarToUpdate(car); // Store car details for updating
      setShowModal(true); // Open the modal
    } else {
      console.error('Car not found'); // Handle case where car is not found
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (!newCar.model || !newCar.year || !newCar.pricePerDay || !newCar.brand || (!newCar.mainImage && !carToUpdate)) {
      toast("Please fill out all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("model", newCar.model);
    formData.append("year", newCar.year);
    formData.append("pricePerDay", newCar.pricePerDay);
    formData.append("brand", newCar.brand);

    if (newCar.mainImage instanceof File) {
      formData.append("image", newCar.mainImage);
    }

    if (newCar.coverImages.length > 0) {
      newCar.coverImages.forEach((image) => {
        if (image instanceof File) {
          formData.append(`coverImages`, image);
        }
      });
    }

    carMutation.mutate({ formData, carId: carToUpdate?._id });
  };

  const handleChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    setNewCar({ ...newCar, mainImage: e.target.files[0] });
  };

  const handleCoverImagesChange = (e) => {
    setNewCar({ ...newCar, coverImages: Array.from(e.target.files) });
  };

  const deleteCar = async (id) => {
    try {
      await axios.delete(`https://backend-car-rentals.vercel.app/cars/${id}`, {
        headers: {
          token: `${userToken}`,
        },
      });
      refetch();
      toast("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting car:", error.response || error.message); // Log the error message or response
      toast("Failed to delete car. Please try again.");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="container">
      <div className="row">
        {cars?.map((car) => (
          <div className="row border rounded my-3 p-3" key={car._id}>
            <div className="col-md-3">
              <img src={car.image?.secure_url} alt={car.model} className="img-fluid" style={{ height: '100px', objectFit: 'cover' }} />
            </div>
            <div className="col-md-5">
            <div>
              <h5>{car.model}</h5>
              <p><strong>Year:</strong> {car.year}</p>
            </div>
              <div>
                <p><strong>Price Per Day:</strong> ${car.pricePerDay}</p>
                <p><strong>Brand:</strong> {car.brand?.name}</p>
              </div>
             
            </div>
            <div className="col-md-4">
            <button className="btn btn-dark" onClick={() => handleUpdate(car._id)}>
            Update
          </button>
          <button className="btn btn-danger ms-2" onClick={() => deleteCar(car._id)}>
            Delete
          </button>
            </div>

          </div>
        ))}
      </div>
      <button className="btn btn-main mt-3 w-100 mx-auto" onClick={handleCreate}>
        Add New Car
      </button>

      {/* Modal for adding/updating car */}
      <div className={`modal ${showModal ? "show d-block" : ""}`} tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{carToUpdate ? "Update Car" : "Add New Car"}</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="model" className="form-label">
                    Model
                  </label>
                  <input type="text" className="form-control" id="model" name="model" value={newCar.model} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">
                    Year
                  </label>
                  <input type="number" className="form-control" id="year" name="year" value={newCar.year} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="pricePerDay" className="form-label">
                    Price Per Day
                  </label>
                  <input type="number" className="form-control" id="pricePerDay" name="pricePerDay" value={newCar.pricePerDay} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="brand" className="form-label">
                    Brand
                  </label>
                  <select className="form-select" name="brand" value={newCar.brand} onChange={handleChange}>
                    <option value="">Select Brand</option>
                    {brands?.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="mainImage" className="form-label">
                    Main Image
                  </label>
                  <input type="file" className="form-control" id="mainImage" onChange={handleMainImageChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="coverImages" className="form-label">
                    Cover Images
                  </label>
                  <input type="file" className="form-control" id="coverImages" multiple onChange={handleCoverImagesChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                {carToUpdate ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCars;
