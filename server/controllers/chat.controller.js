import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";


export const accessChats = async (req, res) => {
    try {

        const { userId } = req.body;

        if (!userId) {
            return res.status(404).json(
                {
                    success: false,
                    data: null,
                    message: "User not found"
                }
            );
        }

        const isChat = await Chat.find(
            {
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: req.user._id } } },
                    { users: { $elemMatch: { $eq: userId } } },
                ]
            }
        )
            .populate("users", "-password")
            .populate("latestMessage")
            .exec();

        const populatedChat = await User.populate(
            isChat, {
            path: "latestMessage.sender",
            select: "userName fullName profileImg"
        });


        // if chat is not created yet
        if (!(populatedChat.length > 0)) {

            const newChat = await Chat.create(
                {
                    chatName: "sender",
                    isGroupChat: false,
                    users: [req.user._id, userId]
                }
            );

            const newPopulatedChat = await Chat
                .findById(newChat._id)
                .populate("users", "-password")
                .exec();


            return res.status(201).json(
                {
                    success: true,
                    data: newPopulatedChat,
                    message: "Chat access successfully"
                }
            );
        }


        return res.status(201).json(
            {
                success: true,
                data: populatedChat,
                message: "Chat access successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to Chat access,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}
