import express from "express";

const router = express.Router();
import { verifyJwtToken } from "../middlewares/auth.middleware.js"
import {
    createPost,
    postLikeHandler,
    bookmarkedHandler,
    createComment,
    deleteComment,
    likeOnComment,
    fetchAllPosts,
    deletePost,
    getUserPosts,
    createCommentOnComment
} from "../controllers/post.controller.js"


router.use(verifyJwtToken);


// post route
router.route("/create-post").post(createPost);
router.route("/getUserPosts").get(getUserPosts);
router.route("/delete-post/:postId").delete(deletePost);
router.route("/fetch-posts").get(fetchAllPosts);


// like and bookmark functionality
router.route("/like-unlike-post/:postId").patch(postLikeHandler);
router.route("/bookmarked-unbookmarked-post/:postId").patch(bookmarkedHandler);


// comment routes
router.route("/create-comment").post(createComment);
router.route("/delete-comment/:commentId").delete(deleteComment);
router.route("/create-reply-comment").post(createCommentOnComment);
router.route("/like-comment/:commentId").patch(likeOnComment);



export default router;