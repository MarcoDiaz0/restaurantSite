import e from "express";
import {
  createRestaurant,
  getNotifications,
  getRestaurantData,
  getRestaurantOrders,
  setNotifications,
} from "../controllers/restaurant.controller.js";

const RestaurantRouter = e.Router();

RestaurantRouter.get("/:_id", getRestaurantData);
RestaurantRouter.post("/create", createRestaurant);
RestaurantRouter.get("/getOrders/:_id", getRestaurantOrders);
RestaurantRouter.get("/notification/:_id", getNotifications);
RestaurantRouter.get("/setNotification/:_id", setNotifications);

export default RestaurantRouter;
