import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { userContext } from "../../Context/UserContext";

export const ManageBrands = () => {
  const { data: brands, refetch } = useQuery("brands", () =>
    axios.get("https://backend-car-rentals.vercel.app/brand").then((res) => res.data)
  );

  const { userToken } = useContext(userContext);

  const [newBrand, setNewBrand] = useState("");
  const [editBrand, setEditBrand] = useState(null); // For editing a brand

  // Create brand mutation
  const mutation = useMutation(
    async (brand) =>
      axios.post(
        "https://backend-car-rentals.vercel.app/brand",
        brand,
        {
          headers: {
            token: `${userToken}`, // Update here to match backend expectations
          },
        }
      ),
    { onSuccess: () => refetch() }
  );

  // Update brand mutation
  const updateMutation = useMutation(
    async ({ id, name }) =>
      axios.put(
        `https://backend-car-rentals.vercel.app/brand/${id}`,
        { name },
        {
          headers: {
            token: `${userToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        refetch();
        setEditBrand(null); // Clear edit state after successful update
      },
    }
  );

  // Delete brand
  const deleteBrand = async (id) => {
    try {
      await axios.delete(`https://backend-car-rentals.vercel.app/brand/${id}`, {
        headers: {
          token: `${userToken}`,
        },
      });
      refetch();
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const handleCreate = () => {
    mutation.mutate({ name: newBrand });
    setNewBrand("");
  };

  const handleUpdate = () => {
    if (editBrand) {
      updateMutation.mutate({ id: editBrand._id, name: editBrand.name });
    }
  };

  
  return (
    <div className="mt-5">
      <div className="position-relative w-100 mx-auto mb-3">
        <input
          className="form-control w-100"
          type="text"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
          placeholder="New Brand Name"
        />
        <button
          className="btn btn-main position-absolute top-0 end-0"
          onClick={handleCreate}
        >
          Create Brand
        </button>
      </div>

      <div className="container shadow p-4">
        <div className="row">
          {brands?.map((brand) => (
            <div className="col-md-12 my-2 d-flex justify-content-between align-items-center" key={brand._id}>
              {editBrand && editBrand._id === brand._id ? (
                <>
                  <input
                    type="text"
                    className="form-control w-50"
                    value={editBrand.name}
                    onChange={(e) =>
                      setEditBrand({ ...editBrand, name: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-success"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditBrand(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{brand.name}</span>
                  <div>
                    <button
                      className="btn btn-dar mx-2"
                      onClick={() => setEditBrand(brand)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteBrand(brand._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
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