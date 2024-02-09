import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        otp: {
            type: String,
        },
        expiresIn: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;