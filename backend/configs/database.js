import mongoose from "mongoose";

export const connect_To_mongoDB = async () => {  
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("connected to database :-)");
  } catch (error) {
    console.error(error);
  }
};
//  "mongodb://localhost:27017/resturantWeb"
