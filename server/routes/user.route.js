import express from "express";

const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

import {
    getUserDetailsByUsername,
    updateUserDetails,
    userFollow,
    updateUserCoverImage,
    fetchSearches,
    getAllConnectedUsers,
} from "../controllers/user.contoller.js";



router.route("/getUserDetailsByUsername/:username").get(getUserDetailsByUsername);
router.route("/updateUserDetails").patch(verifyJwtToken, updateUserDetails);
router.route("/fetch-users").get(fetchSearches);
router.route("/userFollowHandler/:anotherUserId").patch(verifyJwtToken, userFollow);
router.route("/updateUserCoverImage").post(verifyJwtToken, updateUserCoverImage);
router.route("/get-all-connected-user").get(verifyJwtToken, getAllConnectedUsers);

// ****************** CHAT *****************
// router.route("/chat").post(accessChats);
// router.route("/chat").get(fetchChats);
// router.route("/chat/create-group").post(createGroupChats);
// router.route("/chat/rename-group").post(createGroupChats);
// router.route("/chat/remove-group").post(createGroupChats);
// router.route("/chat/add-group").post(createGroupChats);



export default router;