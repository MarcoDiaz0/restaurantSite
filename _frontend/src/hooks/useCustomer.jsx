import axios from "axios";
import { authSlice } from "../Store/user";
import { useFavouritesStore } from "../Store/favouraites";
import { useState } from "react";
import { useAlert } from "../Store/Alert";

//! Get Favourites
export const useGetFavourites = () => {
  const { setFavouritesPlates } = useFavouritesStore();
  const {
    auth: { _id },
  } = authSlice();
  const getFavourites = async () => {
    try {
      const res = await axios.get(`/api/customer/favourite/${_id}`);
      setFavouritesPlates(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { getFavourites };
};
//! Remove / Add Plate To Favourites
export const useAddRemoveFav = () => {
  const { setFavouritesPlates, favouritesPlates } = useFavouritesStore();
  const {
    auth: { _id },
  } = authSlice();
  const AddRemoveFav = async (action, plate) => {
    try {
      const res = await axios.post(`/api/customer/favourite/${action}`, {
        _id,
        plate,
      });
      if (action == "add") setFavouritesPlates(res.data.favourites);
      if (action == "delete")
        setFavouritesPlates(
          favouritesPlates.filter((plat) => plat._id != plate)
        );
    } catch (error) {
      console.log(error);
    }
  };
  return { AddRemoveFav };
};

//! Rate Plates
export const useRatePlates = () => {
  const {
    auth: { _id },
  } = authSlice();
    const { Alert } = useAlert();
  
  const ratePlate = async (stars, id) => {
    try {
      const res = await axios.post("/api/customer/rate", {
        customer: _id,
        stars,
        _id: id,
      });
      Alert(res.data.message, true);
      
    } catch (error) {
      console.log(error);
      Alert(error.response.data.message, false);
    }
  };
  return { ratePlate };
};
//! Get Customer Orders
export const useGetOrders = () => {
  const {
    auth: { _id },
  } = authSlice();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await axios.get(`api/customer/orders/${_id}`);
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { getOrders, orders };
};
