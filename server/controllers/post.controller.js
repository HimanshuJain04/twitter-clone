import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const createPost = (req, res) => {
    try {

        const {
            description,
            userId
        } = req.body;

        const postPath = req.files?.post?.path;

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

        if (postPath) {
            postUrl = await uploadToCloudinary(postPath)?.secure_url;
            console.log("postUrl: ", postUrl)
        }

        const newPost = await Post.create(
            {
                description,
                postUrl
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

        return res.status(500).json(
            {
                success: true,
                data: newPost,
                message: "Post created successfully"
            }
        )
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

export const createPgost = (req, res) => {
    try {


        return res.status(500).json(
            {
                success: true,
                data: ,
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

