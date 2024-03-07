import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import AdditionalDetails from "../models/additionalDetails.model.js";
import { uploadFileToCloudinary } from "../utils/fileUploader.js"


// ******************************** FOLLOW OPERATIONS ***********************************

export const userFollow = async (req, res) => {
    try {
        const userId = req.user?._id;  // Current user's ID
        const { anotherUserId } = req.params; // ID of the user to follow/unfollow

        // Check if the current user is already following the other user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                data: null
            });
        }

        const isAlreadyFollowed = user.following.includes(anotherUserId);

        if (isAlreadyFollowed) {
            // Unfollow the user
            await Promise.all([
                User.findByIdAndUpdate(userId, { $pull: { following: anotherUserId } }),
                User.findByIdAndUpdate(anotherUserId, { $pull: { followers: userId } })
            ]);
        } else {
            // Follow the user

            // create notification
            const newNotification = await Notification.create(
                {
                    messageTo: anotherUserId,
                    messageFrom: userId,
                    message: "Follow"
                }
            );


            // push user into another user list
            await Promise.all([
                User.findByIdAndUpdate(userId, { $addToSet: { following: anotherUserId } }),
                User.findByIdAndUpdate(anotherUserId, { $addToSet: { followers: userId } })
            ]);
        }

        // Populate and return the updated user and another user
        const updatedUser = await User
            .findById(anotherUserId)
            .select("fullName email userName additionalDetails profileImg following followers posts createdAt")
            .populate("additionalDetails")
            .populate("following", ["fullName", "userName", "profileImg"])
            .populate("followers", ["fullName", "userName", "profileImg"])
            .exec();

        return res.status(200).json({
            success: true,
            data: { updatedUser },
            isFollow: !isAlreadyFollowed,
            message: "Follow/Unfollow operation successful"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server failed to process the request. Please try again.",
            error: error.message,
            success: false,
            data: null
        });
    }
};


export const getUserDetailsByUsername = async (req, res) => {
    try {

        const userName = req.params.username;

        const existedUser = await User
            .findOne({ userName })
            .select("fullName email userName additionalDetails profileImg following followers posts createdAt")
            .populate("additionalDetails")
            .populate("following", ["fullName", "userName", "profileImg"])
            .populate("followers", ["fullName", "userName", "profileImg"])
            .exec();

        const len = existedUser.posts.length;
        existedUser.posts = [];


        if (!existedUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        return res.status(201).json(
            {
                success: true,
                data: { existedUser, postLength: len },
                message: "Fetch user details by username successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to fetch user details by username,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


export const updateUserDetails = async (req, res) => {
    try {

        const userId = req?.user?._id;

        const {
            fullName,
            city,
            link,
            dob,
            gender,
            phoneNo,
            bio
        } = req.body;

        const file = req.files?.profileImg;

        const existedUser = await User
            .findById(userId);

        const existedAdditionlDetails = await AdditionalDetails
            .findById(existedUser.additionalDetails);

        if (!existedUser || !existedAdditionlDetails) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        const fieldsToUpdate = {
            city,
            link,
            dob,
            gender,
            phoneNo,
            bio
        };

        Object.entries(fieldsToUpdate).forEach(([key, value]) => {
            if (value !== undefined) {
                existedAdditionlDetails[key] = value;
            }
        });

        if (file) {
            const imageRes = await uploadFileToCloudinary(file);
            existedUser.profileImg = imageRes.secure_url;
        }

        if (fullName) {
            existedUser.fullName = fullName;
        }

        await existedUser.save();
        await existedAdditionlDetails.save();

        return res.status(201).json(
            {
                success: true,
                data: null,
                message: "Update user details successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to update user details,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


// TODO: update -> remove calls
export const updateUserCoverImage = async (req, res) => {
    try {

        const userId = req?.user?._id;

        const { post } = req.files;

        const existedUser = await User
            .findById(userId);

        const existedAdditionlDetails = await AdditionalDetails
            .findById(existedUser.additionalDetails);


        if (!existedUser || !existedAdditionlDetails) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        const imageRes = await uploadFileToCloudinary(post);

        existedAdditionlDetails.coverImg = imageRes.secure_url;

        await existedAdditionlDetails.save();

        const user = await User
            .findById(userId)
            .select("fullName email userName additionalDetails profileImg following followers posts createdAt")
            .populate("additionalDetails")
            .populate("following", ["fullName", "userName", "profileImg"])
            .populate("followers", ["fullName", "userName", "profileImg"])
            .exec();

        return res.status(201).json(
            {
                success: true,
                data: user,
                message: "Update user cover image  successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to update user cover image,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}
