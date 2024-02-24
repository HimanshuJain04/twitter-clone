import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        postUrls: [
            {
                type: String
            }
        ],
        description: {
            type: String,
        },
        duration: {
            type: Number,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                likedAt: {
                    type: Date,
                    default: null
                }
            }
        ],
        bookmarks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;