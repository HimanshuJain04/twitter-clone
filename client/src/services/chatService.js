import { jsonRequest, fileUploadRequest } from "./http-common.js";


export const getAllChats = async (userId) => {
    return await jsonRequest.get(`/chat/${userId}`);
}

export const createChat = async (data) => {
    return await jsonRequest.post("/chat/create-chat", data);
}



