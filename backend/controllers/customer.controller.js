import customers from "../models/Customer.model.js";
//! signup
export const createCustomer = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, Error: "Please provide all fields" });
  }

  const usernameExist = await customers.findOne({
    username: username,
  });
  
  if (usernameExist) {
    return res
      .status(403)
      .json({ success: false, message: "this username already exist" });
  }

  const emailExist = await customers.findOne({
    email: email,
  });
  if (emailExist) {
    return res
      .status(402)
      .json({ success: false, message: "this Email already exist" });
  }

  const newCustomer = new customers({
    username: username,
    password: password,
    email: email,
  });
  try {
    await newCustomer.save();
    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    res.status(500).json({ success: false, Error: "something went wrong" });
  }
};
//! login
export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, Error: "Please provide all fields" });
  }
  try {
    const isExist = await customers.findOne({
      email: email,
      password: password,
    });
    if (isExist) res.status(201).json({ success: true, data: isExist });
    else {
      const mailExist = await customers.findOne({
        email: email,
      });
      if (mailExist) res.status(402)
      else
        res.status(403)
    }
  } catch (error) {
    res.status(500).json({ success: false, Error: "server error" });
  }
};
