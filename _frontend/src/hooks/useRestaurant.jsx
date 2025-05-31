import axios from "axios";
import { useState } from "react";
import { authSlice } from "../Store/user";
import { useRestaurant } from "../Store/restaurant";
import { useUploadImage } from "./useImage";
import { useNavigate } from "react-router-dom";
import { useOrdersStore } from "../Store/Orders";
//! get data of the restaurant
export const useGetRestaurant = () => {
  const { setData, setPlates } = useRestaurant();
  const [exist, setExist] = useState(false);

  const getRestaurantData = async (_id) => {
    try {
      const res = await axios.get(`/api/restaurant/${_id}`);
      setData(res.data.data);
      setPlates(res.data.plates);
      setExist(true);
    } catch (error) {
      console.log(error);
    }
  };
  return { getRestaurantData, exist };
};

//! create  restaurant
export const useCreateRestaurant = () => {
  const {
    auth: { _id },
  } = authSlice();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState("");
  const { uploadImage } = useUploadImage();
  const CreateRestaurant = async (credentials) => {
    let imgURL;
    if (typeof credentials.coverPicture != "string")
      imgURL = await uploadImage(credentials.coverPicture);
    credentials.coverPicture = imgURL;
    setloading(true);
    try {
      setErr("");
      const res = await axios.post("/api/restaurant/create", {
        ...credentials,
        _id,
      });
      navigate("/restaurantHome/page");
      return res.data.success;
    } catch (error) {
      if (error.response.status === 403) setErr("Already Exist");
    } finally {
      setloading(false);
    }
  };
  return { CreateRestaurant, loading, err };
};

//! Get Restaurant Orders
export const useGetOrders_R = () => {
  const { setOrders } = useOrdersStore();
  const {
    auth: { _id },
  } = authSlice();
  const getRestOrders = async () => {
    try {
      const res = await axios.get(`/api/restaurant/getOrders/${_id}`);
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { getRestOrders };
};
