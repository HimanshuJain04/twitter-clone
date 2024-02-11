import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        ],
        description: {
            type: String,
        },
        duration: {
            type: String,
        },
        fileUrl: {
            type: String
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;