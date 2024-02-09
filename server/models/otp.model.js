import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        email: {
            type:String
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