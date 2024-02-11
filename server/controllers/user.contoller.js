import User from "../models/user.model.js";



// ******************************** FOLLOW OPERATIONS ***********************************

export const userFollow = async (req, res) => {
    try {

        const userId = req.user?._id;  // my-id
        const anotherUserId = req.params?.userId; // aother user id

        const existedUser = await User.findById(userId);
        const existedanotherUserId = await User.findById(anotherUserId);

        if (!existedUser || !existedanotherUserId) {
            return res.status(404).json(
                {
                    message: "User not found",
                    success: false,
                    data: null
                }
            )
        }

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
