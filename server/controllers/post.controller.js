import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { uploadFileToCloudinary, uploadMultipleFilesToCloudinary } from "../utils/fileUploader.js"



// ******************************** POST CRUD OPERATIONS ***********************************

export const createPost = async (req, res) => {
    try {

        const {
            description,
        } = req.body;

        const userId = req.user?._id;

        const allPosts = req.files?.post;


        if (!userId || (!allPosts && !description)) {
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

        let postUrls = [];
        let duration = null;

        if (allPosts) {

            let allPostResponse = [];

            if (Array.isArray(allPosts)) {
                allPostResponse = await uploadMultipleFilesToCloudinary(allPosts);

            } else {
                const response = await uploadFileToCloudinary(allPosts);
                allPostResponse.push(response);
            }


            if (allPostResponse.length === 0) {
                return res.status(500).json(
                    {
                        message: "File upload failed",
                        success: false,
                        data: null
                    }
                )
            }

            allPostResponse.forEach((postRes) => {
                postUrls.push(postRes?.secure_url);
            })
        }

        const newPost = await Post.create(
            {
                description,
                postUrls,
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

        return res.status(200).json(
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


export const fetchAllPosts = async (req, res) => {
    try {

        const allPosts = await Post
            .find({})
            .populate("user")
            .exec();


        return res.status(200).json(
            {
                success: true,
                data: allPosts,
                message: "All Posts fetch successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to fetch all posts,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}

export const getUserPosts = async (req, res) => {
    try {


        const userId = req.user?._id || req.params.userId;


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


        const AllPosts = await Post.find(
            { user: userId }
        )
            .sort({ createdAt: -1 })
            .limit(10);





        return res.status(200).json(
            {
                success: true,
                data: allPosts,
                message: "All Posts fetch successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to fetch all posts,Please try again",
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


export const postLikeHandler = async (req, res) => {
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

        const existedPost = await Post.findById(postId);

        if (!existedPost) {
            return res.status(404).json(
                {
                    message: "Post not found",
                    success: false,
                    data: null
                }
            )
        }

        const isLiked = existedPost.likes.includes(userId);

        if (isLiked) {
            // unlike logic

            const tempPost = existedPost.likes.filter(id => {
                id !== userId
            });
            existedPost.likes = tempPost;


            const tempUserLike = existedUser.liked.filter(id => {
                id !== postId
            });
            existedUser.liked = tempUserLike;

        } else {

            // like logic
            existedPost.likes.push(userId);
            existedUser.liked.push(postId);

        }

        await existedPost.save();
        await existedUser.save();

        const updatedUser = await User.findById(userId);

        return res.status(200).json(
            {
                success: true,
                isLiked: !isLiked,
                data: updatedUser,
                message: "Liked or Unliked the post successfully"
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to liked or unliked the post,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


export const bookmarkedHandler = async (req, res) => {
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

        const existedPost = await Post.findById(postId);

        if (!existedPost) {
            return res.status(404).json(
                {
                    message: "Post not found",
                    success: false,
                    data: null
                }
            )
        }

        const isBookmarked = existedPost.bookmarks.includes(userId);

        if (isBookmarked) {
            // unbookmark logic

            const tempPost = existedPost.bookmarks.filter(id => {
                id !== userId
            });
            existedPost.bookmarks = tempPost;


            const tempUserBookmark = existedUser.bookmarked.filter(id => {
                id !== postId
            });
            existedUser.bookmarked = tempUserBookmark;

        } else {
            // bookmark logic
            existedPost.bookmarks.push(userId);
            existedUser.bookmarked.push(postId);

        }

        await existedPost.save();
        await existedUser.save();

        const updatedUser = await User.findById(userId);

        return res.status(200).json(
            {
                success: true,
                isBookmarked: !isBookmarked,
                data: updatedUser,
                message: "Bookmarked or Unbookmarked the post successfully"
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to bookmarked or unbookmarked the post,Please try again",
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

            const respone = await uploadMultipleFilesToCloudinary(filePath);

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

        return res.status(200).json(
            {
                success: true,
                data: { post: updatedPost, comment: newComment },
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
                    comments: deletedComment._id
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


export const createCommentOnComment = async (req, res) => {
    try {

        const {
            description,
            commentId,
            postId,
        } = req.body;

        const userId = req.user?._id;

        const filePath = req.files?.file?.tempFilePath;

        if (!userId || !commentId || (!filePath && !description)) {
            return res.status(401).json(
                {
                    message: "All fields are required",
                    success: false,
                    data: null
                }
            )
        }

        const existedUser = await User.findById(userId);

        const existedComment = await Comment.findById(commentId);

        if (!existedUser || !existedComment) {
            return res.status(404).json(
                {
                    message: "User or comment not found",
                    success: false,
                    data: null
                }
            )
        }

        let fileUrl = null;
        let duration = null;

        if (filePath) {

            const respone = await uploadMultipleFilesToCloudinary(filePath);

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
                post: existedComment._id
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

        // push new comment into the existedComment db
        existedComment.comments.push(newComment._id);
        await existedComment.save();

        const updatedPost = await Post.findById(postId)

        return res.status(200).json(
            {
                success: true,
                data: { post: updatedPost, existedComment, newComment },
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