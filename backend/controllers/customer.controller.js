import mongoose from "mongoose";
import Customers from "../models/Customer.model.js";
import Orders from "../models/Order.model.js";
import Plates from "../models/Plates.model.js";
import Restaurants from "../models/Restaurant.model.js";

//! Get Customer Orders
export const getOrders = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }
  try {
    const orders = await Orders.find({ customer: id }).populate({
      path: "plate",
      select: "name picture",
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, Error: "Bad request" });
  }
};
//! Get Customer favourites Plates
export const getFavouritesPlates = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }
  try {
    const plates = await Customers.findById(_id).populate("favourites");
    res.status(200).json({ success: true, data: plates.favourites });
  } catch (error) {
    res.status(400).json({ success: false, Error: "Bad request" });
  }
};
//! Add New Plate To Favourites
export const addToFavourites = async (req, res) => {
  const { _id, plate } = req.body;
  if (
    !mongoose.Types.ObjectId.isValid(_id) ||
    !mongoose.Types.ObjectId.isValid(plate)
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }
  if (!_id || !plate) {
    return res.status(400).json({
      success: false,
      error: "User ID and Plate ID are required",
    });
  }
  try {
    const plateExists = await Plates.findById(plate);
    if (!plateExists) {
      return res.status(404).json({
        success: false,
        error: "Plate Not Found",
      });
    }
    const Customer = await Customers.findByIdAndUpdate(
      _id,
      {
        $addToSet: { favourites: plate },
      },
      { new: true }
    ).populate("favourites");

    if (!Customer) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plate added to favorites",
      favourites: Customer.favourites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
//! Remove Plate from Favourites
export const removeFromFavourites = async (req, res) => {
  const { plate, _id } = req.body;
  if (
    !mongoose.Types.ObjectId.isValid(_id) ||
    !mongoose.Types.ObjectId.isValid(plate)
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }
  try {
    const customer = await Customers.findById(_id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        error: "Customer not found",
      });
    }
    if (!customer.favourites.includes(plate)) {
      return res.status(404).json({
        success: false,
        error: "Plate not found in favorites",
      });
    }
    await Customers.findByIdAndUpdate(_id, {
      $pull: { favourites: plate },
    });
    res.status(200).json({
      success: true,
      message: "Plate removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};
//! Rate Plate
export const ratePlate = async (req, res) => {
  const { stars, _id, customer } = req.body;
  if (
    !mongoose.Types.ObjectId.isValid(_id) ||
    !mongoose.Types.ObjectId.isValid(customer)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  if (!stars)
    return res.status(400).json({
      success: false,
      message: "Invalid rating stars",
    });
  try {
    const getCurrentRate = await Plates.findById(_id).select("rate -_id restaurant");    
    if (!getCurrentRate)
      return res.status(404).json({
        success: false,
        message: "Plate Not Found",
      });
    const isExsist = getCurrentRate.rate.rater.includes(customer);
    if (isExsist) {
      return res.status(402).json({
        success: false,
        message: "You have rated this before",
      });
    } else {
      const success = await Plates.findByIdAndUpdate(
        { _id },
        {
          $set: {
            rate: {
              stars: getCurrentRate.rate["stars"] + stars,
              rater: [...getCurrentRate.rate["rater"], customer],
              value:
                (getCurrentRate.rate["stars"] + stars) /
                (getCurrentRate.rate["rater"].length + 1),
            },
          },
        }
      );
      if (success) {
        await Restaurants.findOneAndUpdate(
          { _id: getCurrentRate.restaurant },
          { $inc: { "notification.newRate": 1 } }
        );
        return res.status(202).json({
          success: true,
          message: "rating success",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, Error: "Bad request" });
  }
};
//!Get Notifications
export const getNotifications = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    const notifications = await Customers.findById(_id).select("notification");
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
    await Customers.findOneAndUpdate(
      { _id },
      { $set: { "notification": 0 } }
    );
    return res.status(203).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, Error: "Bad request" });
  }
};