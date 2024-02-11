import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { uploadToCloudinary } from "../utils/fileUploader.js"
import e from "express";



// ******************************** POST CRUD OPERATIONS ***********************************
export const createPost = async (req, res) => {
    try {

        const {
            description,
        } = req.body;

        const userId = req.user?._id;

        const postPath = req.files?.post?.tempFilePath;

        if (!userId || (!postPath && !description)) {
            return res.status(401).json(
                {
                    message: "All fields are required",
                    success: false,
                    data: null
                }
            )
        }

        const existedUser = await User.findById(userId);

        if (!existedUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        let postUrl = null;
        let duration = null;

        if (postPath) {

            const respone = await uploadToCloudinary(postPath);

            if (!respone) {
                return res.status(500).json(
                    {
                        message: "File upload failed",
                        success: false,
                        data: null
                    }
                )
            }

            postUrl = respone?.url;
            duration = respone?.duration;

        }

        const newPost = await Post.create(
            {
                description,
                postUrl,
                duration,
                user: userId
            }
        );

        if (!newPost) {
            return res.status(404).json(
                {
                    message: "Post not created",
                    success: false,
                    data: null
                }
            )
        }

        existedUser.posts.push(newPost._id);
        await existedUser.save();

        return res.status(500).json(
            {
                success: true,
                data: newPost,
                message: "Post created successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to create post,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


// TODO:Update
export const deletePost = async (req, res) => {
    try {

        const { postId } = req.params;
        const userId = req.user?._id;


        if (!userId || !postId) {
            return res.status(401).json(
                {
                    message: "All fields are required",
                    success: false,
                    data: null
                }
            )
        }

        const existedUser = await User.findById(userId);

        if (!existedUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        // delete comment on that post
        await Comment.deleteMany({ _id: postId });

        // delete the post from users list
        const updatedUser = User.findByIdAndUpdate(
            { _id: postId },
            {
                $pull: {
                    posts: postId
                }
            }
        );

        // delete the post from users liked and bookmarked

        // delete that post
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json(
                {
                    message: "Post not found",
                    success: false,
                    data: null
                }
            )
        }


        return res.status(200).json(
            {
                success: true,
                data: { user: updatedUser, deletePost },
                message: "Post deleted successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to delete the post,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


// ******************************** POST LIKE AND BOOKMARK OPERATIONS ***********************************


export const likePost = async (req, res) => {
    try {

        const userId = req.user?._id;
        const { postId } = req.params;

        const existedUser = await User.findById(userId);

        if (!existedUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        const updatedPost = await Post.findByIdAndUpdate(
            { _id: postId },
            {
                $push: { likes: existedUser._id }
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json(
                {
                    message: "Post not found",
                    success: false,
                    data: null
                }
            )
        }

        return res.status(500).json(
            {
                success: true,
                data: updatedPost,
                message: "Liked the post successfully"
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to like the post,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


export const unlikePost = async (req, res) => {
    try {

        const userId = req.user?._id;
        const { postId } = req.params;

        const existedUser = await User.findById(userId);

        if (!existedUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        const updatedPost = await Post.findByIdAndUpdate(
            { _id: postId },
            {
                $pull: { likes: existedUser._id }
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json(
                {
                    message: "Post not found",
                    success: false,
                    data: null
                }
            )
        }

        return res.status(500).json(
            {
                success: true,
                data: updatedPost,
                message: "Unliked the post successfully"
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to unlike the post,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


export const bookmarked = async (req, res) => {
    try {

        const userId = req.user?._id;
        const { postId } = req.params;

        const existedUser = await User.findById(userId);

        if (!existedUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        const updatedPost = await Post.findByIdAndUpdate(
            { _id: postId },
            {
                $push: { bookmarks: existedUser._id }
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json(
                {
                    message: "Post not found",
                    success: false,
                    data: null
                }
            )
        }

        const updatedUser = await User.findByIdAndUpdate(
            { _id: existedUser._id },
            {
                $push: { bookmarked: updatedPost._id }
            },
            { new: true }
        );

        return res.status(500).json(
            {
                success: true,
                data: updatedUser,
                message: "Bookmarked the post successfully"
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to bookmarked the post,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


export const unbookmarked = async (req, res) => {
    try {

        const userId = req.user?._id;
        const { postId } = req.params;

        const existedUser = await User.findById(userId);

        if (!existedUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        const updatedPost = await Post.findByIdAndUpdate(
            { _id: postId },
            {
                $pull: { bookmarks: existedUser._id }
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json(
                {
                    message: "Post not found",
                    success: false,
                    data: null
                }
            )
        }

        const updatedUser = await User.findByIdAndUpdate(
            { _id: existedUser._id },
            {
                $pull: { bookmarked: updatedPost._id }
            },
            { new: true }
        );

        return res.status(500).json(
            {
                success: true,
                data: updatedUser,
                message: "Unbookmarked the post successfully"
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to unbookmarked the post,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


// ******************************** POST COMMENTS OPERATIONS ***********************************

export const createComment = async (req, res) => {
    try {

        const {
            description,
            postId
        } = req.body;

        const userId = req.user?._id;

        const filePath = req.files?.file?.tempFilePath;

        if (!userId || !postId || (!filePath && !description)) {
            return res.status(401).json(
                {
                    message: "All fields are required",
                    success: false,
                    data: null
                }
            )
        }

        const existedUser = await User.findById(userId);

        const existedPost = await Post.findById(postId);

        if (!existedUser || !existedPost) {
            return res.status(404).json(
                {
                    message: "User or post not found",
                    success: false,
                    data: null
                }
            )
        }

        let fileUrl = null;
        let duration = null;

        if (filePath) {

            const respone = await uploadToCloudinary(filePath);

            if (!respone) {
                return res.status(500).json(
                    {
                        message: "File upload failed",
                        success: false,
                        data: null
                    }
                )
            }

            fileUrl = respone?.url;
            duration = respone?.duration;

        }

        const newComment = await Comment.create(
            {
                description,
                fileUrl,
                duration,
                user: userId,
                post: postId
            }
        );

        if (!newComment) {
            return res.status(404).json(
                {
                    message: "Post not created",
                    success: false,
                    data: null
                }
            )
        }

        // push new comment into the post db
        existedPost.comments.push(newComment._id);
        await existedPost.save();

        const updatedPost = await Post.findById(postId)

        return res.status(500).json(
            {
                success: true,
                data: updatedPost,
                message: "Comment created successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to create comment,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


export const deleteComment = async (req, res) => {
    try {

        const { commentId } = req.params;


        if (!commentId) {
            return res.status(401).json(
                {
                    message: "All fields are required",
                    success: false,
                    data: null
                }
            )
        }

        // delete comment on that post
        const deletedComment = await Comment.findByIdAndDelete(commentId);


        // delete that comment into post
        const updatedPost = await Post.findByIdAndUpdate(
            { _id: deletedComment.post },
            {
                $pull: {
                    comments: deleteComment._id
                }
            },
            { new: true }
        );

        if (!deletedComment) {
            return res.status(404).json(
                {
                    message: "Comment not found",
                    success: false,
                    data: null
                }
            )
        }


        return res.status(200).json(
            {
                success: true,
                data: { updatedPost },
                message: "Comment deleted successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to delete the comment,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


export const likeOnComment = async (req, res) => {
    try {

        const userId = req.user?._id;
        const { commentId } = req.params;

        const existedUser = await User.findById(userId);

        if (!existedUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        const existedComment = await Comment.findById(commentId);

        const isAlreadyLiked = existedComment.likes.includes(userId);

        if (isAlreadyLiked) {
            existedComment.likes.pop(userId);
        } else {
            existedComment.likes.push(userId);
        }

        await existedComment.save();

        const updatedComment = await Comment.findById(commentId);

        if (!updatedComment) {
            return res.status(404).json(
                {
                    message: "Post not found",
                    success: false,
                    data: null
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                data: updatedComment,
                message: "Liked/Unlike on comment successfully"
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to like/unlike the comment,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}



export const createPgost = (req, res) => {
    try {


        return res.status(500).json(
            {
                success: true,
                data: [],
                message: ""
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "erver failed to create post,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}



