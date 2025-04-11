import e from "express";
import {
  getOrders,
  getFavouritesPlates,
  addToFavourites,
  removeFromFavourites,
} from "../controllers/customer.controller.js";


const customerRouter = e.Router();

customerRouter.get("/orders/:id", getOrders);
customerRouter.get("/favourite/:_id",getFavouritesPlates)
customerRouter.post("/favourite/add",addToFavourites)
customerRouter.delete("/favourite/delete",removeFromFavourites)


export default customerRouter;
