import { jsonRequest, fileUploadRequest } from "./http-common.js";


export const createPost = async (data) => {
    return await fileUploadRequest.post("/post/create-post", data);
}
