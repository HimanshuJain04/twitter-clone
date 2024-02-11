
import express from "express";
const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js"

import {
    login,
    logout,
    signup,
    verifyOtp,
} from "../controllers/auth.controller.js";




router.route("/login").post(login);

router.route("/register").post(signup);

router.route("/verifyOtp").post(verifyOtp);

router.route("/resend-otp").post(async (req, res) => {
    const { email } = req.body;
    await sendMail(email);
});

router.route("/logout").post(verifyJwtToken, logout);


export default router;
