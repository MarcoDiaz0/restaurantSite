import customers from "../models/Customer.model.js";

export const createCustomer = async (req, res) => {
  const customerData = req.body;

  if (!customerData.username || !customerData.email || !customerData.password) {
    return res
      .status(400)
      .json({ success: false, Error: "Please provide all fields" });
  }

  const usernameExist = await customers.findOne({
    username: customerData.username,
  });
  if (usernameExist) {
    return res
      .status(400)
      .json({ success: false, message: "this username already exist" });
  }

  const emailExist = await customers.findOne({
    email: customerData.email,
  });
  if (emailExist) {
    return res
      .status(400)
      .json({ success: false, message: "this Email already exist" });
  }

  const newCustomer = new customers(customerData);
  try {
    await newCustomer.save();
    res.status(201);
  } catch (error) {
    res.status(500).json({ success: false, Error: "something went wrong" });
  }
};
export const loginCustomer = async (req, res) => {
  const customerData = req.body;

  if (!customerData.email || !customerData.password) {
    return res
      .status(400)
      .json({ success: false, Error: "Please provide all fields" });
  }
  try {
    const isExist = await customers.findOne({
      email: customerData.email,
      password: customerData.password,
    });
    if (isExist) res.status(201);
    else
      res
        .status(404)
        .json({ success: false, message: "email or password is incorrect" });
  } catch (error) {
    res.status(500).json({ success: false, Error: "server error" });
  }
};
