import User from "../models/user.model.js";



// ******************************** FOLLOW OPERATIONS ***********************************

export const userFollow = async (req, res) => {
    try {

        const userId = req.user?._id;  // my-id
        const anotherUserId = req.params?.userId; // aother user id

        const existedUser = await User.findById(userId);
        const existedAnotherUser = await User.findById(anotherUserId);

        if (!existedUser || !existedAnotherUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        const isAlreadyFollowed = existedUser.following.includes(anotherUserId);

        if (isAlreadyFollowed) {
            existedUser.following.pop(anotherUserId);
            existedAnotherUser.followers.pop(userId);

        } else {
            existedUser.following.push(anotherUserId);
            existedAnotherUser.followers.push(userId);
        }

        await existedUser.save();
        await existedAnotherUser.save();

        const updatedUser = await User.findById(existedUser._id);

        if (!updatedUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                data: updatedUser,
                message: "Follow/Unfollow the user successfully"
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to follow/unfollow the user,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


export const getUserDetailsByUsername = async (req, res) => {
    try {

        const userId = req.user?._id;  // my-id
        const anotherUserId = req.params?.userId; // aother user id

        const existedUser = await User.findById(userId);
        const existedAnotherUser = await User.findById(anotherUserId);

        if (!existedUser || !existedAnotherUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        const isAlreadyFollowed = existedUser.following.includes(anotherUserId);

        if (isAlreadyFollowed) {
            existedUser.following.pop(anotherUserId);
            existedAnotherUser.followers.pop(userId);

        } else {
            existedUser.following.push(anotherUserId);
            existedAnotherUser.followers.push(userId);
        }

        await existedUser.save();
        await existedAnotherUser.save();

        const updatedUser = await User.findById(existedUser._id);

        if (!updatedUser) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                data: updatedUser,
                message: "Follow/Unfollow the user successfully"
            }
        )
    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to follow/unfollow the user,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}

