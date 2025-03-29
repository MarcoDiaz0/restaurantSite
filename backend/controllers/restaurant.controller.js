import Plates from "../models/Plates.model.js";
import Restaurants from "../models/Restaurant.model.js";
//!get data
export const getRestaurantData = async (req, res) => {
  const { id } = req.params;
  try {
    const Restaurant = await Restaurants.findOne({
      _id: id,
    }).select("-password -__v -OTPCode -username -email -createdAt -updatedAt");

    if (!Restaurant.restaurantName) {
      res.status(402).json({ success: false });
      return;
    }
    const plates = await Plates.find({ idRestaurant: id });
    res.status(201).json({ success: true, data: Restaurant, plates: plates });
  } catch (error) {
    res.status(500).json({ success: false, Error: "something went wrong" });
  }
};
//! create
export const createRestaurant = async (req, res) => {
  const { restaurantName, location, coverPicture, id } = req.body;
  console.log(req.body);
  
  if (!restaurantName || !id) {
    res
      .status(402)
      .json({ success: false, Error: "Please provide all fields" });
  }

  const NameExist = await Restaurants.findOne({
    restaurantName: restaurantName,
  });
  if (NameExist)
    res.status(403).json({ success: false, Error: "Already Exist" });
  else {
    try {
      const data = await Restaurants.updateOne(
        { _id: id },
        {
          $set: {
            restaurantName: restaurantName,
            longitude: parseFloat(location.longitude),
            latitude: parseFloat(location.latitude),
            coverPicture: coverPicture,
          },
        }
      );
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      res.status(500).json({ success: false, Error: "server error" });
    }
  }
};
//! update
export const updateRestaurant = async (req, res) => {
  const { restaurantName, location, coverPicture, id } = req.body;
  try {
    await Restaurants.updateOne(
      { _id: id },
      {
        $set: {
          restaurantName: restaurantName,
          longitude: location.longitude,
          latitude: location.latitude,
          coverPicture: coverPicture,
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, Error: "server error" });
  }
};
