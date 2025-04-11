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
    category,
    healthCondition,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(restaurant)) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }
  if (
    !name ||
    !restaurant ||
    !price ||
    !type ||
    !category ||
    !healthCondition
  ) {
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
      healthCondition,
      picture,
      location: { latitude, longitude },
    });
    res.status(201).json({ success: true, data: plate });
  } catch (error) {
    res.status(400).json({ success: false, Error: "something went wrong" });
  }
};
//! Get One Plate
export const getOnePlate = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }
  try {
    const plate = await Plates.findById(_id);
    res.status(200).json({ success: true, data: plate });
  } catch (error) {
    res.status(400).json({ success: false, Error: "bad request" });
  }
};
//! Update Plate
export const updatePlates = async (req, res) => {
  const { _id, restaurant, name, price, description, picture } = req.body;
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
    await Plates.updateOne(
      { _id, restaurant },
      {
        $set: {
          name: name,
          description: description,
          price: price,
          picture: picture,
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, Error: "server error" });
  }
};
//! Delete Plate
export const deletePlates = async (req, res) => {
  const { _id, restaurant } = req.body;
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
    const success = await Plates.findOneAndDelete({
      _id,
      restaurant,
    });
    if (!success) {
      return res.status(404).json({
        success: false,
        error: "Plate not found or not associated with this restaurant",
      });
    }
    
    res
      .status(200)
      .json({ success: true, message: "The Plate has been deleted" });
  } catch (error) {
    res.status(400).json({ success: false, Error: "something went wrong" });
  }
};
//! Filter Plates
export const filterPlates = async (req, res) => {
  const {
    category,
    healthCondition,
    type,
    location: { latitude, longitude },
  } = req.body;

  const page = req.query.page || 1;
  const limit = req.query.limit || 2;
  const args = {
    category: { $in: category },
    healthCondition: { $in: healthCondition },
    type: { $in: type },
    "location.latitude": { $gt: latitude - 0.027, $lt: latitude + 0.027 },
    "location.longitude": { $gt: longitude - 0.027, $lt: longitude + 0.027 },
  };
  try {
    const platesCount = await Plates.countDocuments(args);
    const plates = await Plates.find(args)
      .skip(limit * (page - 1))
      .limit(limit);
    res.status(200).json({
      success: true,
      data: plates,
      allPages: Math.ceil(platesCount / limit),
    });
  } catch (error) {
    res.status(400).json({ success: false, Error: "Bad Request" });
  }
};
