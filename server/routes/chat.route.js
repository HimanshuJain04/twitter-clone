import express from "express";

const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

import {
    createChat,
    findChat,
    userChats,
} from "../controllers/chat.controller.js";

// router.use(verifyJwtToken);


// ************************** CHAT *****************************

router.route("/:userId").get(userChats);
router.route("/find/:firstId/:secondId").get(findChat);
router.route("/create-chat").post(createChat);


export default router;