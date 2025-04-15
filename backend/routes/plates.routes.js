import e from "express";
import {
  createPlates,
  deletePlate,
  filterPlates,
  getOnePlate,
  updatePlate,
} from "../controllers/plates.controller.js";

const platesRoutes = e.Router();

platesRoutes.post("/", filterPlates);
platesRoutes.post("/create", createPlates);
platesRoutes.put("/update", updatePlate);
platesRoutes.delete("/delete", deletePlate);
platesRoutes.get("/getone/:_id", getOnePlate);

export default platesRoutes;
