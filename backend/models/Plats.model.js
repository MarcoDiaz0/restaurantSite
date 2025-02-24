import mongoose from "mongoose";

const platSchema = new mongoose.Schema(
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
      type: Array,
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
    HealthCondition: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true, // created at , updated at
  }
);
const plats = mongoose.model("plats", platSchema);
export default plats;
