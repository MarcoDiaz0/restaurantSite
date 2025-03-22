import e from "express";
import {
  createRestaurant,
  getRestaurantData,
  updateRestaurant,
} from "../controllers/restaurant.controller.js";


const RestaurantRouter = e.Router();

RestaurantRouter.get("/:id", getRestaurantData);
RestaurantRouter.post("/create", createRestaurant);
RestaurantRouter.put("/update", updateRestaurant);

export default RestaurantRouter;
  