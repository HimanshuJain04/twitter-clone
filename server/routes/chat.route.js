import express from "express";

const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

import {
    accessChats
} from "../controllers/chat.controller.js";

router.use(verifyJwtToken);


// ****************** CHAT *****************

router.route("/").post(accessChats);
// router.route("/chat").get(fetchChats);
// router.route("/chat/create-group").post(createGroupChats);
// router.route("/chat/rename-group").post(createGroupChats);
// router.route("/chat/remove-group").post(createGroupChats);
// router.route("/chat/add-group").post(createGroupChats);


export default router;