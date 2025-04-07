import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    idClient: {
      type: Schema.Types.ObjectId,
      ref: "Customers",
      required: true,
    },
    idRestaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurants",
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
const orders = mongoose.model("orders", orderSchema);
export default orders;
