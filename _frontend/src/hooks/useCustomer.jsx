import axios from "axios";
import { authSlice } from "../Store/user";

//! Get Favourites
export const useGetFavourites = () => {
  const getFavourites = () => {
    const {
      auth: { _id },
    } = authSlice();
    try {
      const res = axios.get(`/api/customer/favourite/${_id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { getFavourites };
};
//! Add Plate To Favourites
export const useAddToFav = () => {
  const addToFavourites = (plate) => {
    const {
      auth: { _id },
    } = authSlice();
    try {
      const res = axios.post("/api/customer/favourite/add",{_id,plate});
      return res.data.favourites;
    } catch (error) {
      console.log(error);
    }
  };
  return { addToFavourites };
};
//! Remove Plate from Favourites
export const useRemoveFromFav = () => {
  const removeFromFavourites = (plate) => {
    const {
      auth: { _id },
    } = authSlice();
    try {
      const res = axios.delete("/api/customer/favourite/delete", { _id, plate });
      return res.data.message;
    } catch (error) {
      console.log(error);
    }
  };
  return { removeFromFavourites };
};