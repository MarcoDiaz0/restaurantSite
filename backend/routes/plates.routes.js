import e from "express";
import {
  createPlates,
  deletePlates,
  filterPlates,
  getOnePlate,
  updatePlates,
} from "../controllers/plates.controller.js";

const platesRoutes = e.Router();

platesRoutes.post("/", filterPlates);
platesRoutes.post("/create", createPlates);
platesRoutes.put("/update", updatePlates);
platesRoutes.delete("/delete", deletePlates);
platesRoutes.get("/getone/:_id", getOnePlate);

export default platesRoutes;
