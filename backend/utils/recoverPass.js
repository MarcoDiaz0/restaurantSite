import Restaurants from "../models/Restaurant.model.js";
import Customers from "../models/Customer.model.js";
import { sendMail } from "./sendMail.js";

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
        from: { name: "Nearby Food", address: process.env.GMAIL },
        to: email,
        subject: "New PassWord",
        text: randomString,
        html: `<b>${randomString} </b>`,
      });

      if (!isSent) {
        res.status(500).json({ success: false, Error: "something went wrong" });
      }
      if (!isOwner) {
        await Customers.updateOne(
          { email: email },
          { $set: { password: randomString } }
        );
      } else {
        await Restaurants.updateOne(
          { email: email },
          { $set: { password: randomString } }
        );
      }
      res
        .status(201)
        .json({ success: true, message: "we sent new password to you" });
    } else {
      if (mailExist) res.status(402);
      else res.status(403).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, Error: "server error" });
  }
};
