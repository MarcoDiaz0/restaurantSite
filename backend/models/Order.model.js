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
    plates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plates",
        required: true,
      },
    ],
    success: {
      type: Boolean,
    },
    price: {
      type: Number,
    },
    location: {
      type: Object,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // created at , updated at
  }
);
const orders = mongoose.model("orders", orderSchema);
export default orders;
