import axios from "axios";
import { authSlice } from "../Store/user";
import { useFavouritesStore } from "../Store/favouraites";

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
      if(action == "add") setFavouritesPlates(res.data.favourites);
      if(action == "delete") setFavouritesPlates(favouritesPlates.filter(plat => plat._id != plate));
      
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
  const ratePlate = async (stars, id) => {
    try {
      const res = await axios.post("/api/customer/rate", {
        customer: _id,
        stars,
        _id: id,
      });
      return res.data.message;
    } catch (error) {
      console.log(error);
    }
  };
  return { ratePlate };
};
