
import express from "express";
const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js"

import {
    login,
    logout,
    signup,
    changePassword,
    resetPassword,
    verifyOtp,
    resendOtp,
} from "../controllers/auth.controller.js";




router.route("/login").post(login);

router.route("/signup").post(signup);

router.route("/verify-otp").post(verifyOtp);

router.route("/logout").post(verifyJwtToken, logout);

router.route("/resend-otp").post(resendOtp);

router.route("/change-password").patch(changePassword);

router.route("/reset-password").patch(verifyJwtToken, resetPassword);



export default router;
