import customers from "../models/Customer.model.js";
import { sendMail } from "../utils/sendMail.js";
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
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  const isSent = await sendMail({
    from: { name: "Nearby Food", address: process.env.GMAIL },
    to: email,
    subject: "Confirmation Code",
    text: String(randomNumber),
    html: `<b>${randomNumber} </b>`,
  });

  if (!isSent) {
    res.status(500).json({ success: false, Error: "something went wrong" });
  }
  const newCustomer = new customers({
    username: username,
    password: password,
    email: email,
    OTPCode: String(randomNumber),
  });
  try {
    await newCustomer.save();
    res.status(201).json({ success: true, data: newCustomer });
    setTimeout(async () => {
      const account = await customers.findOne({
        _id: newCustomer._id,
      });
      if (account.OTPCode !== null)
        await customers.findOneAndDelete({ _id: newCustomer._id });
    }, 50000);
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

      if (mailExist) res.status(402);
      else res.status(403).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, Error: "server error" });
  }
};
//! check OTP
export const checkOTPCustomer = async (req, res) => {
  const { auth, otp } = req.body;

  try {
    const account = await customers.findOne({
      _id: auth,
    });

    if (account?.OTPCode === otp) {
      await customers.updateOne({ _id: auth }, { $set: { OTPCode: null } });
      res.status(201).json({ success: true, message: "Email Confirmed" });
    } else
      res
        .status(500)
        .json({ success: false, Error: "The Numbers are not correct" });
  } catch (error) {
    res.status(500).json({ success: false, Error: "something went wrong" });
  }
};


