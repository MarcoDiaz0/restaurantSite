import mongoose, { Schema } from "mongoose";

const plateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    restaurant: {
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
      type: Array,
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
    location:{
      type:Object
    },
    
  },
  {
    timestamps: true, // created at , updated at
  }
);
const Plates = mongoose.model("Plates", plateSchema);
export default Plates;
