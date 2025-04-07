import mongoose, { Schema } from "mongoose";

const plateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    idRestaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    healthCondition: {
      type: Array,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true, // created at , updated at
  }
);
const Plates = mongoose.model("plates", plateSchema);
export default Plates;
