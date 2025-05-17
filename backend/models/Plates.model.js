import mongoose, { Schema } from "mongoose";

const plateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: Object,
      required: true,
    },
    picture: {
      type: String,
    },
    location: {
      type: Object,
      required: true,
    },
    rate: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true, // created at , updated at
  }
);
const Plates = mongoose.model("Plates", plateSchema);
export default Plates;
