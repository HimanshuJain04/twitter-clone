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


export default router;