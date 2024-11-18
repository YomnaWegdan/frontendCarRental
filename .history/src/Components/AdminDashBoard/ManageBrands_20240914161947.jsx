import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { userContext } from "../../Context/UserContext";

export const ManageBrands = () => {
    const { data: brands, refetch } = useQuery("brands", () =>
      axios
        .get("https://backend-car-rentals.vercel.app/brand")
        .then((res) => res.data)
    );
    const { userToken } = useContext(userContext);
    const mutation = useMutation(
      async (newBrand) =>
        await axios.post(
          "https://backend-car-rentals.vercel.app/brand",
          newBrand,
          {
            headers: {
              token: `${userToken}`, // Update here to match backend expectations
            },
          }
        ),
      {
        onSuccess: () => refetch(),
      }
    );
  
    const deleteBrand = async (id) => {
      try {
        await axios.delete(`https://backend-car-rentals.vercel.app/brand/${id}`, {
          headers: {
            token: `${userToken}`, // Pass token for authorization
          },
        });
        refetch(); // Refetch the list after successful deletion
      } catch (error) {
        console.error("Error deleting brand:", error); // Log the error for debugging
      }
    };
  
    const [newBrand, setNewBrand] = useState("");
  
    const handleCreate = () => {
      mutation.mutate({ name: newBrand });
      setNewBrand("");
    };
  
    return (
      
      <div className="mt-5">
        <h2>Manage Brands</h2>
        <div className="position-relative w-75 mx-auto">
        <input className="form-control w-100 mx-auto mb-3" 
          type="text"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
          placeholder="New Brand Name"
        />
        <button className="btn btn-main position-absolute top-0 end-0" onClick={handleCreate}>Create Brand</button>
        </div>
        <div className="container">
        <div className="row">
        {brands?.map((brand) => (
            <div className="col-md-6 key={brand._id}>
              {brand.name}
              <button onClick={() => deleteBrand(brand._id)}>Delete</button>
            </li>
          ))}
        </div>
        </div>
       
      </div>
    );
  };

  /*
   <ul>
          {brands?.map((brand) => (
            <li key={brand._id}>
              {brand.name}
              <button onClick={() => deleteBrand(brand._id)}>Delete</button>
            </li>
          ))}
        </ul>
  */