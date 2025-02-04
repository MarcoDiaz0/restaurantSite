import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true, // created at , updated at
  }
);
const customers = mongoose.model("customers", customerSchema);
export default customers;
