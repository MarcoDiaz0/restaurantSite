import e from "express";
import {
  checkOTPRestaurant,
  createRestaurant,
  loginRestaurant,
} from "../controllers/restaurant.controller.js";
import { recoverPass } from "../utils/recoverPass.js";

const RestaurantRouter = e.Router();

RestaurantRouter.post("/", createRestaurant);
RestaurantRouter.post("/login", loginRestaurant);
RestaurantRouter.post("/OTP", checkOTPRestaurant);
RestaurantRouter.post("/passRecover", recoverPass);

export default RestaurantRouter;
