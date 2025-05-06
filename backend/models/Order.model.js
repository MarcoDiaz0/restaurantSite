import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
    plate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plates",
      required: true,
    },

    status: {
      type: Boolean,
    },
    price: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true, // created at , updated at
  }
);
const orders = mongoose.model("orders", orderSchema);
export default orders;
