import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";




export const addMessage = async (req, res) => {
    try {

        const { chatId, senderId, text } = req.body;

        const newMessage = await Message.create(
            {
                chatId,
                senderId,
                content: text
            }
        );


        return res.status(201).json(
            {
                success: true,
                data: newMessage,
                message: "New message created successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to create new message,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}


export const getMessages = async (req, res) => {
    try {

        const { chatId } = req.params;

        const existedMessage = await Message.findOne({ chatId });


        return res.status(201).json(
            {
                success: true,
                data: existedMessage,
                message: "get message successfully"
            }
        );

    } catch (error) {

        return res.status(500).json(
            {
                message: "Server failed to get message,Please try again",
                error: error.message,
                success: false,
                data: null
            }
        )
    }
}
