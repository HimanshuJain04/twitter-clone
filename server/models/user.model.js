import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        profileImg: {
            type: String,
        },
        additionalDetail: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AdditionalDetails"
        },
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        bookmarked: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        refreshToken: {
            type: String
        },
        accessToken: {
            type: String
        },
        isVerified: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;