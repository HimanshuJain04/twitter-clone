
import express from "express";
const router = express.Router();

import {
    login,
    signup,
    verifyOtp,
} from "../controllers/auth.controller.js";




router.route("login").post(login);

router.route("register").post(signup);

router.route("verifyOtp").post(verifyOtp);



export default router;
