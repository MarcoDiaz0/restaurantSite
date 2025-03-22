import Plates from "../models/Plates.model.js";

export const createplates = async (req, res) => {
  const {
    name,
    idRestaurant,
    description = "",
    platePicture = "",
    price,
    type,
    category,
    healthCondition,
  } = req.body;
  console.log(req.body);

  if (
    !name ||
    !idRestaurant ||
    !price ||
    !type ||
    !category ||
    !healthCondition
  ) {
    res
      .status(402)
      .json({ success: false, Error: "Please provide all fields" });
  }
  const newPlate = new Plates({
    name: name,
    idRestaurant: idRestaurant,
    description: description,
    price: price,
    type: type,
    category: category,
    healthCondition: healthCondition,
    platePicture: platePicture,
  });
  try {
    await newPlate.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, Error: "something went wrong" });
  }
};
export const getplates = async (req, res) => {};
export const updateplates = async (req, res) => {};
export const deleteplates = async (req, res) => {};
