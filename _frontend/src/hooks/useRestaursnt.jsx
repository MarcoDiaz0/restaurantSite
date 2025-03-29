import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { authSlice } from "../Store/user";
import { RestaurantInfo } from "../Store/restaurant";
import { useUploadImage } from "./useImage";
//! get data of the restaurant
export const useGetRestaurant = () => {
  const [loading, setloading] = useState(false);
  const [restaurantExist, setRestaurantExist] = useState(false);
  const { setData, setPlates } = RestaurantInfo();

  const getRestaurantData = async (id) => {
    setloading(true);
    try {
      const res = await axios.get(`/api/restaurant/${id}`);      
      setData(res.data.data);  
          
      setPlates(res.data.plates);
      setRestaurantExist(true);
    } catch (error) {
      if (error.response.status === 402) setRestaurantExist(false);
    } finally {
      setloading(false);
    }
  };
  return { getRestaurantData, loading, restaurantExist };
};

//! create a restaurant
export const useCreateRestaurant = () => {
  const { auth:{id} } = authSlice();
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState("");
  const { uploadImage } = useUploadImage();
  const CreateRestaurant = async (credentials) => {
    
    const imgURL = await uploadImage(credentials.coverPicture);
    credentials.coverPicture = imgURL;
    setloading(true);
    try {
      setErr("");
      const res = await axios.post("/api/restaurant/create", {
        ...credentials,
        id,
      });
      
      return res.data.success;
    } catch (error) {
      if (error.response.status === 403) setErr("Already Exist");
    } finally {
      setloading(false);
    }
  };
  return { CreateRestaurant, loading, err };
};
