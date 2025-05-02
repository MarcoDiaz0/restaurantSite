import e from "express";
import {
  createPlates,
  deletePlate,
  filterPlates,
  getOnePlate,
  getPlates,
  updatePlate,
} from "../controllers/plates.controller.js";

const platesRoutes = e.Router();

platesRoutes.post("/", filterPlates);
platesRoutes.post("/getPlates", getPlates);
platesRoutes.post("/create", createPlates);
platesRoutes.put("/update", updatePlate);
platesRoutes.put("/delete", deletePlate);
platesRoutes.get("/getone/:_id", getOnePlate);

export default platesRoutes;
