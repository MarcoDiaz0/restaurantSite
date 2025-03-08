import e from "express";
import {
  checkOTPCustomer,
  createCustomer,
  loginCustomer,
} from "../controllers/customer.controller.js";
import { recoverPass } from "../utils/recoverPass.js";

const customerRouter = e.Router();

customerRouter.post("/", createCustomer);
customerRouter.post("/login", loginCustomer);
customerRouter.post("/OTP", checkOTPCustomer);
customerRouter.post("/passRecover", recoverPass);

export default customerRouter;
