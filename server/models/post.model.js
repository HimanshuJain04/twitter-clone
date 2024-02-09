import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        postUrl: {
            type: String
        },
        description: {
            type: String,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
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