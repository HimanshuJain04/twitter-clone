import mongoose from "mongoose";

const additionalDetailsSchema = new mongoose.Schema(
    {
        dob: {
            type: Date,
        },
        phoneNo: {
            type: Number,
        },
        gender: {
            enum: ["Male", "Female", "Others"],
            type: String
        }
    }
);

const AdditionalDetails = mongoose.model("AdditionalDetails", additionalDetailsSchema);
export default AdditionalDetails;