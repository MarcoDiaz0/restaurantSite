import mongoose from "mongoose";

const commandSchema = new mongoose.Schema(
  {
    idClient: {
      type: String,
      required: true,
    },
    idRestaurant: {
      type: String,
      required: true,
    },
    plats: {
      type: Array,
      required: true,
    },
    status: {
      type: Boolean,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true, // created at , updated at
  }
);
const commands = mongoose.model("commands", commandSchema);
export default commands;
