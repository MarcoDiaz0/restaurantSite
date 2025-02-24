import e from "express";
import {
  createRestaurant,
  loginRestaurant,
} from "../controllers/restaurant.controller.js";

const RestaurantRouter = e.Router();

RestaurantRouter.post("/", createRestaurant);
RestaurantRouter.post("/login", loginRestaurant);

export default RestaurantRouter;
