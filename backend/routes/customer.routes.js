import e from "express";
import {
  getOrders,
  getFavouritesPlates,
  addToFavourites,
  removeFromFavourites,
  ratePlate,
  getNotifications,
  setNotifications,
} from "../controllers/customer.controller.js";

const customerRouter = e.Router();

customerRouter.get("/orders/:id", getOrders);
customerRouter.get("/favourite/:_id", getFavouritesPlates);
customerRouter.post("/favourite/add", addToFavourites);
customerRouter.post("/favourite/delete", removeFromFavourites);
customerRouter.post("/rate", ratePlate);
customerRouter.get("/notification/:_id", getNotifications);
customerRouter.get("/setNotification/:_id", setNotifications);

export default customerRouter;
