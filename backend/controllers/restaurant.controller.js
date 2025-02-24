import Restaurants from "../models/Restaurant.model.js";
//! signup
export const createRestaurant = async (req, res) => {
  const { username, password, email } = req.body;
  console.log(req.body);
  
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, Error: "Please provide all fields" });
  }

  const usernameExist = await Restaurants.findOne({
    username: username,
  });
  
  if (usernameExist) {
    return res
      .status(403)
      .json({ success: false, message: "this username already exist" });
  }

  const emailExist = await Restaurants.findOne({
    email: email,
  });
  if (emailExist) {
    return res
      .status(402)
      .json({ success: false, message: "this Email already exist" });
  }

  const newRestaurant = new Restaurants({
    username: username,
    password: password,
    email: email,
  });
  try {
    await newRestaurant.save();
    res.status(201).json({ success: true, data: newRestaurant });
  } catch (error) {
    res.status(500).json({ success: false, Error: "something went wrong" });
  }
};
//! login
export const loginRestaurant = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, Error: "Please provide all fields" });
  }
  try {
    const isExist = await Restaurants.findOne({
      email: email,
      password: password,
    });
    if (isExist) res.status(201).json({ success: true, data: isExist });
    else {
      const mailExist = await Restaurants.findOne({
        email: email,
      });
      if (mailExist) res.status(402);
      else res.status(403);
    }
  } catch (error) {
    res.status(500).json({ success: false, Error: "server error" });
  }
};
