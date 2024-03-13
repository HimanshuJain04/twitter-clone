import express from "express";

const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

import {
    findChat,
    userChats,
} from "../controllers/chat.controller.js";

// router.use(verifyJwtToken);


// ************************** CHAT *****************************

router.route("/:userId").get(userChats);
router.route("/find/:firstId/:secondId").get(findChat);

export default router;