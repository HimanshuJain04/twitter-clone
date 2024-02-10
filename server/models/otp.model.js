import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        otp: {
            type: String,
        },
        // Adding a field to represent expiration time
        expiresAt: {
            type: Date,
            // Default value set to 5 minutes from the current time
            default: Date.now() + 5 * 60 * 1000
        }
    }
);

// Creating a TTL index on 'expiresAt' field
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
