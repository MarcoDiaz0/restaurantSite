import mongoose from "mongoose";

export const connect_To_mongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/resturantWeb");
    console.log("connected to database :-)");
  } catch (error) {
    console.error(error);
  }
};
