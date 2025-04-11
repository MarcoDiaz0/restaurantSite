import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
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
  OTPCode: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plates",
    },
  ],
});
const Customers = mongoose.model("Customers", customerSchema);
export default Customers;
