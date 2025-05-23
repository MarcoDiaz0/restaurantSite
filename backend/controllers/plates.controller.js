import mongoose from "mongoose";
import Plates from "../models/Plates.model.js";
import Restaurants from "../models/Restaurant.model.js";
//! Create Plate
export const createPlates = async (req, res) => {
  const {
    name,
    restaurant,
    description = "",
    picture = "",
    price,
    type,
    category = {},
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(restaurant)) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }
  if (!name || !price || !type || !restaurant) {
    res
      .status(402)
      .json({ success: false, Error: "Please provide all fields" });
  }

  try {
    const { latitude, longitude } = await Restaurants.findById(
      restaurant
    ).select("latitude longitude");

    const plate = await Plates.create({
      name,
      restaurant,
      description,
      price,
      type,
      category,
      picture,
      location: { latitude, longitude },
      rate: { stars: 0, rater: [], value: 0 },
    });
    res.status(201).json({ success: true, data: plate });
  } catch (error) {
    res.status(400).json({ success: false, Error: "something went wrong" });
  }
};
//! Update Plate
export const updatePlate = async (req, res) => {
  const { _id, restaurant, price, description, picture } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(_id) ||
    !mongoose.Types.ObjectId.isValid(restaurant)
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }
  try {
    const newPlate = await Plates.findOneAndUpdate(
      { _id, restaurant },
      {
        $set: {
          description,
          price,
          picture,
        },
      }
    );
    if (!newPlate) {
      return res.status(404).json({
        success: false,
        error: "Plate not found ",
      });
    }
    res.status(200).json({ success: true, data: newPlate });
  } catch (error) {
    res.status(400).json({ success: false, Error: "server error" });
  }
};
//! Delete Plate
export const deletePlate = async (req, res) => {
  const { _id, restaurant } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(_id) ||
    !mongoose.Types.ObjectId.isValid(restaurant)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    const success = await Plates.findOneAndDelete({
      _id,
      restaurant,
    });
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Plate not found",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "The Plate has been deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: "something went wrong" });
  }
};
//! Filter Plates
export const filterPlates = async (req, res) => {  
  const {
    category,
    foodType,
    location: { latitude, longitude },
  } = req.body;
  const categoryFilters = Object.entries(category).map(([key, values]) => ({
    [`category.${key}`]: { $in: values },
  }));
  let location = {
    "location.latitude": { $gt: latitude - 0.027, $lt: latitude + 0.027 },
    "location.longitude": { $gt: longitude - 0.027, $lt: longitude + 0.027 },
  };
  if( !latitude || !longitude) location = null
  const page = req.query.page || 1;
  const args = {
    type: { $in: foodType },
    ...location,
    ...(categoryFilters.length > 0 ? { $or: categoryFilters } : {}),
  };
  try {
    const platesCount = await Plates.countDocuments(args);
    const plates = await Plates.find(args).populate({path:"restaurant",select:"restaurantName"})
      .skip(18 * (page - 1))
      .limit(18);
    res.status(200).json({
      success: true,
      data: plates,
      allPages: Math.ceil(platesCount / 18),
    });
  } catch (error) {
    res.status(400).json({ success: false, Error: "Bad Request" });
  }
};
//! Get Plate By Rating
export const getPlates = async (req, res) => {
  const page = req.query.page || 1;
  const args = {
    "rate.value": { $gt: 3.5 },
  };
  try {
    const platesCount = await Plates.countDocuments(args);
    const plates = await Plates.find(args)
      .populate({ path: "restaurant", select: "restaurantName" })
      .skip(18 * (page - 1))
      .limit(18);
      
    res.status(200).json({
      success: true,
      data: plates,
      allPages: Math.ceil(platesCount / 18),
    });
  } catch (error) {
    res.status(400).json({ success: false, Error: "Bad Request" });
  }
};
