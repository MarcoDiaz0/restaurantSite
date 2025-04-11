import e from "express";
import {
  confirmOrder,
  createOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const orederRouter = e.Router();

orederRouter.post("/create", createOrder);
orederRouter.put("/confirm", confirmOrder);
orederRouter.delete("/delete", deleteOrder);

export default orederRouter;
