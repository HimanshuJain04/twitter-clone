import express from "express";

const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

import {
    getUserDetailsByUsername
} from "../controllers/user.contoller.js";


router.route("/getUserDetailsByUsername/:username").get(getUserDetailsByUsername);


export default router;