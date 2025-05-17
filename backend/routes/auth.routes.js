import e from "express";

import {
  checkOTP,
  createUser,
  getUser,
  login,
  recoverPass,
  updateUser,
} from "../controllers/auth.controller.js";

const authRouter = e.Router();

authRouter.post("/", createUser);
authRouter.post("/login", login);
authRouter.post("/OTP", checkOTP);
authRouter.get("/getUser/:_id", getUser);
authRouter.post("/passRecover", recoverPass);
authRouter.put("/update", updateUser);

export default authRouter;
