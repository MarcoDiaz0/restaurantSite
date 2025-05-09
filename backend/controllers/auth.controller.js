import mongoose from "mongoose";
import Customers from "../models/Customer.model.js";
import Restaurants from "../models/Restaurant.model.js";
import { sendMail } from "../utils/sendMail.js";
//! signup
export const createUser = async (req, res) => {
  const { username, password, email, isOwner } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  let usernameExist;

  if (isOwner) {
    usernameExist = await Restaurants.findOne({ username });
  } else {
    usernameExist = await Customers.findOne({ username });
  }
  if (usernameExist) {
    return res
      .status(403)
      .json({ success: false, message: "this username already exist" });
  }
  let emailExist;
  if (isOwner) {
    emailExist = await Restaurants.findOne({ email });
  } else {
    emailExist = await Customers.findOne({ email });
  }
  if (emailExist) {
    return res
      .status(402)
      .json({ success: false, message: "this Email already exist" });
  }
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  await sendMail({
    from: {
      name: "Nearby Food",
      address: "nearbyfoood@gmail.com",
    },
    to: email,
    subject: "Confirmation Code",
    text: String(randomNumber),
    html: `<b>${randomNumber} </b>`,
  });
  let newUser;
  if (isOwner) {
    newUser = new Restaurants({
      username: username,
      password: password,
      email: email,
      OTPCode: String(randomNumber),
    });
  } else {
    newUser = new Customers({
      username: username,
      password: password,
      email: email,
      OTPCode: String(randomNumber),
    });
  }

  try {
    const success = await newUser.save();
    if (success) {
      res
        .status(201)
        .json({ success: true, _id: newUser._id, isOwner: isOwner });
    }
    setTimeout(async () => {
      let account;
      if (isOwner) {
        account = await Restaurants.findOne({
          _id: newUser._id,
        });
      } else {
        account = await Customers.findOne({
          _id: newUser._id,
        });
      }

      if (account?.OTPCode !== null) {
        await Restaurants.findOneAndDelete({ _id: account?._id });
        await Customers.findOneAndDelete({ _id: account?._id });
      }
    }, 50000);
  } catch (error) {
    res.status(500).json({ success: false, Error: "something went wrong" });
  }
};
//! login
export const login = async (req, res) => {
  const { email, password, isOwner } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, Error: "Please provide all fields" });
  }
  try {
    let isExist;
    if (isOwner) {
      isExist = await Restaurants.findOne({
        email: email,
        password: password,
      });
    } else {
      isExist = await Customers.findOne({
        email: email,
        password: password,
      });
    }

    if (isExist)
      res
        .status(200)
        .json({ success: true, data: isExist._id, isOwner: isOwner });
    else {
      let mailExist;
      if (isOwner) {
        mailExist = await Restaurants.findOne({
          email: email,
        });
      } else {
        mailExist = await Customers.findOne({
          email: email,
        });
      }
      if (mailExist) res.status(402).json({ success: false });
      else res.status(403).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, Error: "server error" });
  }
};
//! check OTP
export const checkOTP = async (req, res) => {
  const { _id, otp, isOwner } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  try {
    let account;
    if (isOwner) {
      account = await Restaurants.findById(_id);
    } else {
      account = await Customers.findById(_id);
    }
    if (account?.OTPCode === otp) {
      if (isOwner) {
        await Restaurants.findByIdAndUpdate(
          { _id },
          { $set: { OTPCode: null } }
        );
        res.status(201).json({ success: true, message: "Email Confirmed" });
      } else {
        await Customers.findByIdAndUpdate({ _id }, { $set: { OTPCode: null } });
        res.status(201).json({ success: true, message: "Email Confirmed" });
      }
    } else
      res
        .status(401)
        .json({ success: false, Error: "The Numbers are not correct" });
  } catch (error) {
    res.status(400).json({ success: false, Error: "something went wrong" });
  }
};
//! recover Password
export const recoverPass = async (req, res) => {
  const { email, isOwner } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, Error: "Please provide all fields" });
  }
  let isExist;
  try {
    if (isOwner) {
      isExist = await Restaurants.findOne({
        email: email,
      });
    } else {
      isExist = await Customers.findOne({
        email: email,
      });
    }
    if (isExist) {
      const generateRandomString = (length) => {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      };

      const randomString = generateRandomString(10);
      const isSent = await sendMail({
        from: {
          name: "Nearby Food",
          address: process.env.GMAIL || "nearbyfoood@gmail.com",
        },
        to: email,
        subject: "New PassWord",
        text: randomString,
        html: `<b>${randomString} </b>`,
      });

      if (!isSent) {
        res
          .status(400)
          .json({ success: false, message: "Your Email does not exist" });
      }
      if (!isOwner) {
        await Customers.findOneAndUpdate(
          { email: email },
          { $set: { password: randomString } }
        );
        res
          .status(202)
          .json({ success: true, message: "we sent new password to you" });
      } else {
        await Restaurants.findOneAndUpdate(
          { email: email },
          { $set: { password: randomString } }
        );
        res
          .status(202)
          .json({ success: true, message: "we sent new password to you" });
      }
    } else {
      if (mailExist) res.status(402);
      else res.status(403).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, Error: "bad request" });
  }
};
