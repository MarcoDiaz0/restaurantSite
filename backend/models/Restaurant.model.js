import mongoose from "mongoose";
import bcrypt from "bcrypt";

const RestaurantSchema = new mongoose.Schema({
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
  notification: { type: Object },
});
RestaurantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
const Restaurants = mongoose.model("Restaurants", RestaurantSchema);
export default Restaurants;
