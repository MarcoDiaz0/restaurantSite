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
      required: false,
    },
    restaurantName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // created at , updated at
  }
);
const Restaurants = mongoose.model("Restaurants", RestaurantSchema);
export default Restaurants;
