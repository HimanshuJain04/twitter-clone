import { v2 as cloudinary } from "cloudinary"

export const uploadToCloudinary = async (filPath) => {
    try {

        const options = {
            folder: process.env.CLOUDINARY_FOLDER_NAME,
            resource_type: "auto"
        }

        return await cloudinary.uploader.upload(filPath, options);

    } catch (error) {
        console.log("Error uploading to cloudinary")
        return null;
    }
}