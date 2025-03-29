import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    OTPCode: {
      type: String,
    },
    restaurantName: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    coverPicture: {
      type: String,
    },
  },
  {
    timestamps: true, // created at , updated at
  }
);
const Restaurants = mongoose.model("Restaurants", RestaurantSchema);
export default Restaurants;
