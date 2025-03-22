import e from "express";
import { createplates, deleteplates, getplates, updateplates } from "../controllers/plates.controller.js";

const platesRoutes = e.Router();

platesRoutes.get("/:id", getplates);
platesRoutes.post("/create", createplates);
platesRoutes.put("/update", updateplates);
platesRoutes.delete("/delete", deleteplates);

export default platesRoutes;
