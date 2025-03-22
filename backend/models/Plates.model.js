import mongoose from "mongoose";

const plateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    idRestaurant: {
      type: String,
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
    platePicture: {
      type: String,
    },
  },
  {
    timestamps: true, // created at , updated at
  }
);
const Plates = mongoose.model("plats", plateSchema);
export default Plates;
