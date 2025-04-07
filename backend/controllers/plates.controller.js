import Plates from "../models/Plates.model.js";

export const createplates = async (req, res) => {
  const {
    name,
    idRestaurant,
    description = "",
    picture = "",
    price,
    type,
    category,
    healthCondition,
  } = req.body;

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
  try {
    const plate = await Plates.create({
      name: name,
      idRestaurant: idRestaurant,
      description: description,
      price: price,
      type: type,
      category: category,
      healthCondition: healthCondition,
      picture: picture,
    });
    res.status(201).json({ success: true, data: plate });
  } catch (error) {
    res.status(400).json({ success: false, Error: "something went wrong" });
  }
};
export const getOneplate = async (req, res) => {
  const { _id } = req.params;
  try {
    const plate = await Plates.findById(_id)
    res.status(200).json({ success: true, data: plate });
  } catch (error) {
    res.status(400).json({ success: false, Error: "bad request" });
  }
};
export const updateplates = async (req, res) => {
  const { id, idRestaurant, Name, price, description, picture } = req.body;
  try {
    await Plates.updateOne(
      { _id: id, idRestaurant: idRestaurant },
      {
        $set: {
          name: Name,
          description: description,
          price: price,
          picture: picture,
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, Error: "server error" });
  }
};
export const deleteplates = async (req, res) => {
  const { id, idRestaurant } = req.body;
  try {
    await Plates.findOneAndDelete({
      _id: id,
      idRestaurant: idRestaurant,
    });
    res
      .status(200)
      .json({ success: true, message: "The Plate has been deleted" });
  } catch (error) {
    res.status(400).json({ success: false, Error: "something went wrong" });
  }
};
