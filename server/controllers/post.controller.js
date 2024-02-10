import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { uploadToCloudinary } from "../utils/fileUploader.js"

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



