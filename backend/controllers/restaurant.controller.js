import mongoose from "mongoose";
import Orders from "../models/Order.model.js";
import Plates from "../models/Plates.model.js";
import Restaurants from "../models/Restaurant.model.js";
//!get data
export const getRestaurantData = async (req, res) => {
  const { _id } = req.params;
  try {
    const Restaurant = await Restaurants.findById({
      _id,
    }).select("-password -__v -OTPCode -username -email ");

    if (!Restaurant.restaurantName) {
      res.status(402).json({ success: false });
      return;
    }
    const plates = await Plates.find({ restaurant: _id });
    res.status(200).json({ success: true, data: Restaurant, plates: plates });
  } catch (error) {
    res.status(400).json({ success: false, Error: "something went wrong" });
  }
};
//! create Restaurant
export const createRestaurant = async (req, res) => {
  const { restaurantName, location, coverPicture, _id } = req.body;

  if (!restaurantName || !location || !_id) {
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
        { _id },
        {
          $set: {
            restaurantName: restaurantName,
            longitude: parseFloat(location.longitude),
            latitude: parseFloat(location.latitude),
            coverPicture: coverPicture,
          },
        }
      );
      if (!data)
        return res
          .status(404)
          .json({ success: false, Error: "Restaurat Not Found" });
      res.status(201).json({ success: true, data: data });
    } catch (error) {
      res.status(400).json({ success: false, Error: "server error" });
    }
  }
};

//! Get Restaurant Orders
export const getRestaurantOrders = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }
  try {
    const orders = await Orders.find({ restaurant: _id }).populate({
      path: "plate",
      select: "name picture",
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, Error: "Bad request" });
  }
};
//! Get Notifications
export const getNotifications = async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    const notifications = await Restaurants.findById(_id).select(
      "notification"
    );
    return res.status(201).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(400).json({ success: false, Error: "Bad request" });
  }
};
//! setNotifications
export const setNotifications = async (req, res) => {
  const { _id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    await Restaurants.findOneAndUpdate(
      { _id },
      { $set: { "notification.newOrder": 0, "notification.newRate": 0 } }
    );
    return res.status(203).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, Error: "Bad request" });
  }
};
