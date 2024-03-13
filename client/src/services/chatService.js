import { jsonRequest, fileUploadRequest } from "./http-common.js";


export const getAllChats = async (userId) => {
    return await jsonRequest.get(`/chat/${userId}`);
}

export const getMessages = async (chatId) => {
    return await jsonRequest.get(`/message/${chatId}`);
}

export const addMessage = async (payload) => {
    return await jsonRequest.post(`/message/add-message`, payload);
}

export const createChat = async (data) => {
    return await jsonRequest.post("/chat/create-chat", data);
}



