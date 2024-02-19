import express from "express";

const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js"
import {
    createPost,
    likePost,
    unlikePost,
    bookmarked,
    unbookmarked,
    createComment,
    deleteComment,
    likeOnComment,
    fetchAllPosts,
    deletePost,
    createCommentOnComment
} from "../controllers/post.controller.js"


router.use(verifyJwtToken);


// post route
router.route("/create-post").post(createPost);
router.route("/delete-post/:postId").delete(deletePost);
router.route("/fetch-posts").get(fetchAllPosts);


// like and bookmark functionality
router.route("/like-post/:postId").patch(likePost);
router.route("/unlike-post/:postId").patch(unlikePost);
router.route("/bookmarked-post/:postId").patch(bookmarked);
router.route("/unbookmarked-post/:postId").patch(unbookmarked);


// comment routes
router.route("/create-comment").post(createComment);
router.route("/delete-comment/:commentId").delete(deleteComment);
router.route("/create-reply-comment").post(createCommentOnComment);
router.route("/like-comment/:commentId").patch(likeOnComment);



export default router;