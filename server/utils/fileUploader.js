

export const uploadToCloudinary = async (filPath) => {
    try {

        const options = {
            folder: process.env.CLOUDINARY_FOLDER_NAME,
            resource_type: "auto"
        }
    } catch (error) {
        console.log("Error uploading to cloudinary")
        return null;
    }
}