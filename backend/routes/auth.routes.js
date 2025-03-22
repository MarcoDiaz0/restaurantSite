import e from "express";

import { checkOTP, createUser, login, recoverPass } from "../controllers/auth.controller.js";

const authRouter = e.Router();

authRouter.post("/", createUser);
authRouter.post("/login", login);
authRouter.post("/OTP", checkOTP);
authRouter.post("/passRecover", recoverPass);

export default authRouter;
