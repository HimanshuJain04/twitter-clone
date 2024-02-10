import express from "express";

const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js"
import {
    createPost,
    likePost,
    unlikePost,
    bookmarked,
    unbookmarked
} from "../controllers/post.controller.js"


router.use(verifyJwtToken);

router.route("/create-post").post(createPost);

// post functionality
router.route("/like-post/:postId").patch(likePost);
router.route("/unlike-post/:postId").patch(unlikePost);
router.route("/bookmarked-post/:postId").patch(bookmarked);
router.route("/unbookmarked-post/:postId").patch(unbookmarked);

export default router;