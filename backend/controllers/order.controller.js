import mongoose from "mongoose";
import Orders from "../models/Order.model.js";
import Plates from "../models/Plates.model.js";
import Restaurants from "../models/Restaurant.model.js";
import Customers from "../models/Customer.model.js";

//! Create Order
export const createOrder = async (req, res) => {
  const { adress, restaurant, plate, customer, phoneNumber } = req.body;
  
  const restaurantExist = Restaurants.findById(restaurant);
  if (!restaurantExist) {
    return res.status(404).json({
      success: false,
      message: "Restaurant Does Not Exist",
    });
  }

  if (!phoneNumber || !adress || !plate) {
    return res
      .status(401)
      .json({ success: false, message: "please provide all fields" });
  }
  
  try {
    const { price } = await Plates.findById(plate).select("price -_id");
    const order = await Orders.create({
      phoneNumber,
      adress,
      restaurant,
      price,
      customer,
      plate,
      status: null,
    });
     await Restaurants.findOneAndUpdate(
       { _id: restaurant },
       { $inc: { "notification.newOrder": 1 } }
     );    
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: "bad request" });
  }
};
//! Confirm Order
export const confirmOrder = async (req, res) => {
  const { status, _id, restaurant } = req.body;
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
    const order = await Orders.findOneAndUpdate(
      { _id, restaurant },
      {
        $set: {
          status: status,
        },
      },
      { new: true }
    );    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (order.customer) {
      await Customers.findOneAndUpdate(
        { _id: order.customer },
        { $inc: { notification: 1 } }
      );
    } 
    res.status(203).json({
      success: true,
      message: `Order ${status ? "Confirmed" : "Rejected"}`,
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
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }
  try {
    const success = await Orders.findByIdAndDelete(_id);
    if (!success) {
      return res.status(404).json({
        success: false,
        error: "Order not found ",
      });
    }
    res.status(203).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false, message: "Order not found" });
  }
};
