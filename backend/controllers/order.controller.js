import mongoose from "mongoose";
import Orders from "../models/Order.model.js";
import Plates from "../models/Plates.model.js";
import Restaurants from "../models/Restaurant.model.js";

//! Create Order
export const createOrder = async (req, res) => {
  const { email, location, restaurant, plates, customer } = req.body;
  const restaurantExist = Restaurants.findById(restaurant);
  if (restaurantExist) {
    return res.status(404).json({
      success: false,
      message: "Restaurant Does Not Exist",
    });
  }

  if (!email || !location || !plates ) {
    res
      .status(401)
      .json({ success: false, message: "please provide all fields" });
  }
  const platesPrice = await Plates.find({ _id: { $in: plates } }).select(
    "price"
  );
  let price = 0;
  if (platesPrice.length != 0)
    platesPrice.map((plate) => (price = price + plate.price));
  else return;
  try {
    const order = await Orders.create({
      email,
      location,
      restaurant,
      price,
      customer,
      plates,
    });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: "bad request" });
  }
};
//! Confirm Order
export const confirmOrder = async (req, res) => {
  const { success, _id, restaurant } = req.body;
  
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
    const success = await Orders.findOneAndUpdate(
      { _id, restaurant },
      {
        $set: {
          success: success,
        },
      }
    );
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Order not found or not associated with this restaurant",
      });
    }
    res.status(200).json({
      success: true,message:"order confirmed"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
//! Delete Order
export const deleteOrder = async (req, res) => {
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
  if (!_id) {
    res.status(404).json({ success: false, message: "Order not found" });
  }
  try {
    const success = await Orders.findOneAndDelete({ _id, restaurant });
    if (!success) {
      return res.status(404).json({
        success: false,
        error: "Order not found or not associated with this restaurant",
      });
    }
    res.status(203).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false, message: "Order not found" });
  }
};
