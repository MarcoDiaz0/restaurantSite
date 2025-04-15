import axios from "axios";
import { useState } from "react";

//! Create Plate
export const useCreatePlate = () => {
  const createPlate = async (plate) => {
    try {
      const res = await axios.post("/api/plates/create", plate); // plate =  {name,restaurant,description ,picture ,price,type,category,healthCondition}
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { createPlate };
};
//! Update Plate
export const useUpdatePlate = () => {
  const [loading, setloading] = useState(false);
  const updatePlate = async (plate) => {
    setloading(true);
    try {
      const res = await axios.put("/api/plates/update", plate); // plate = { _id, restaurant, price, description, picture }
      return res.data.data;
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return { updatePlate, loading };
};
//! Delete Plate
export const useDeletePlate = () => {
  const [loading, setloading] = useState(false);

  const deletePlate = async (plate) => {
    setloading(true);
    try {
      const res = await axios.delete("/api/plates/delete", plate); // plate = {_id ,restaurant}
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return { deletePlate, loading };
}; 
//! Get One Plate
export const useOnePlate = () => {
  const getOnePlate = async (_id) => {
    try {
      const res = await axios.post(`/api/plates/getone/${_id}`);
        return res.data.data
    } catch (error) {
      console.log(error);
    }
  };
  return { getOnePlate };
};
//! Filter Plates
// export const useFilterPlates = () => {
//   const filterPlates = async () => {
//     try {
//       await axios.post("/api/plates/");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return { filterPlates };
// };

