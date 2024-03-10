import User from "../models/user.model.js";

export const handleUserConnected = async (userId, socketId) => {
    try {
        await User.findByIdAndUpdate(userId, { socketId });
        console.log(`User ${userId} connected with socket ID ${socketId}`);
    } catch (error) {
        console.error('Error updating user socket ID:', error);
    }
};

export const handleSendMessage = async (socket, messageData) => {
    try {
        const newMessage = new Message(messageData);
        await newMessage.save();

        // Find recipient socket ID (based on recipientId)
        const recipientSocketId = 123;

        io.to(recipientSocketId).emit('receive-message', newMessage);

    } catch (error) {
        console.error('Error updating user socket ID:', error);
    }
};