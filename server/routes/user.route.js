import express from "express";

const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

import {
    getUserDetailsByUsername,
    updateUserDetails
} from "../controllers/user.contoller.js";


router.route("/getUserDetailsByUsername/:username").get(getUserDetailsByUsername);
router.route("/updateUserDetails").patch(verifyJwtToken, updateUserDetails);


export default router;