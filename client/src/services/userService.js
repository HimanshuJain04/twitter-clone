import { jsonRequest, fileUploadRequest } from "./http-common.js";



export const getUserDetailsByUsername = async (username) => {
    return await jsonRequest.get(`/user/getUserDetailsByUsername/${username}`);
}