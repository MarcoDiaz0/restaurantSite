import axios from "axios";
import { useState } from "react";
import { authSlice } from "../Store/user";
import { useRestaurant } from "../Store/restaurant";
import { useUploadImage } from "./useImage";
//! get data of the restaurant
export const useGetRestaurant = () => {
  const [loading, setloading] = useState(false);
  const [restaurantExist, setRestaurantExist] = useState(false);
  const { setData, setPlates } = useRestaurant();
  const getRestaurantData = async (_id) => {
    setloading(true);
    try {
      const res = await axios.get(`/api/restaurant/${_id}`);
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

//! create  restaurant
export const useCreateRestaurant = () => {
  const {
    auth: { _id },
  } = authSlice();
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
        _id,
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

//! update Restaurant
export const useUpdateRestaurant = () => {
  const {
    auth: { _id },
  } = authSlice();
  const { data, setData } = useRestaurant();
  const updateRestaurant = async () => {
    try {
      const res = await axios.put("/api/restaurant/update", { ...data, _id });
      if (res.data.success)
        setData({
          restaurantName: res.data.restaurantName,
          location: {
            latitude: res.data.latitude,
            longitude: res.data.longitude,
          },
          coverPicture: res.data.coverPicture,
        });
    } catch (error) {
      console.log(error);
    }
  };
  return { updateRestaurant };
};
//! Get Restaurant Orders
export const useGetOrders_R = () => {
  const [ResOrders, setResOrders] = useState([]);
  const {
    auth: { _id },
  } = authSlice();
  const getRestOrders = async () => {
    try {
      const res = await axios.get(`/api/restaurant/getOrders/${_id}`);
      setResOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { getRestOrders, ResOrders };
};
