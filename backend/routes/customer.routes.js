import e from "express";
import {
  createCustomer,
  loginCustomer,
} from "../controllers/customer.controller.js";

const customerRouter = e.Router();

customerRouter.post("/", createCustomer);
customerRouter.post("/login", loginCustomer);

export default customerRouter;
