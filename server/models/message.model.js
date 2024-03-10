import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        reciever: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String
        }

    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
