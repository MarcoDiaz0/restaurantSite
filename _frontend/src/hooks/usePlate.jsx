import axios from "axios";
import { useState } from "react";
import { authSlice } from "../Store/user";
import { useUploadImage } from "./useImage";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../Store/Alert";
import { useFiltersStore } from "../Store/filters";
import { useGetRestaurant } from "./useRestaurant";

//! Create Plate
export const useCreatePlate = () => {
  const {
    auth: { _id },
  } = authSlice();
  const { uploadImage } = useUploadImage();
  const navigate = useNavigate();

  const createPlate = async (plate) => {
    const imgURL = await uploadImage(plate.picture);
    plate.picture = imgURL;
    try {
      await axios.post("/api/plates/create", {
        ...plate,
        restaurant: _id,
      }); // plate =  {name,restaurant,description ,picture ,price,type,category}
      navigate("/menu");
    } catch (error) {
      console.log(error);
    }
  };
  return { createPlate };
};
//! Update Plate
export const useUpdatePlate = () => {
  const { Alert } = useAlert();
  const { uploadImage } = useUploadImage();
  const { getRestaurantData } = useGetRestaurant();
  const {
    auth: { _id },
  } = authSlice();
  const updatePlate = async (plate) => {
    let imgURL = plate.picture;
    if (typeof imgURL != "string") imgURL = await uploadImage(imgURL);
    plate.picture = imgURL;
    try {
      const res = await axios.put("/api/plates/update", plate); // plate = { _id, restaurant, price, description, picture }
      console.log(res.data);
      getRestaurantData(_id);

      Alert("The Plate Updated successfully", res.data.success);
    } catch (error) {
      console.log(error);
    }
  };
  return { updatePlate };
};
//! Delete Plate
export const useDeletePlate = () => {
  const [loading, setloading] = useState(false);
  const { Alert } = useAlert();
  const deletePlate = async (plate, restaurant) => {
    setloading(true);

    try {
      const res = await axios.put("/api/plates/delete", {
        _id: plate,
        restaurant,
      });
      Alert(res.data.message, res.data.success);
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
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { getOnePlate };
};
//! Get High Rated Plates
export const useHighRatedPlates = () => {
  const { setFilteredPlates } = useFiltersStore();
  const getPlates = async () => {
    try {
      const res = await axios.post("/api/plates/getPlates");
      setFilteredPlates(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { getPlates };
};
//! Filter Plates
export const useFilterPlates = () => {
  const { filters } = useFiltersStore();
  const { setFilteredPlates } = useFiltersStore();
  const filterPlates = async () => {
    try {
      const res = await axios.post("/api/plates/", filters);
      setFilteredPlates(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { filterPlates };
};
