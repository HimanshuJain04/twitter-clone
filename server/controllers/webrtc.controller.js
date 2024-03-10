import User from "../models/user.model.js";

export const handleUserConnected = async (userId, socketId) => {
    try {
        await User.findByIdAndUpdate(userId, { socketId });
        console.log(`User ${userId} connected with socket ID ${socketId}`);
    } catch (error) {
        console.error('Error updating user socket ID:', error);
    }
};