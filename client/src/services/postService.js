import { jsonRequest, fileUploadRequest } from "./http-common.js";


export const createPost = async (data) => {
    return await fileUploadRequest.post("/post/create-post", data);
}

export const fetchPosts = async () => {
    return await jsonRequest.get("/post/fetch-posts");
}


export const bookmarkPost = async (postId) => {
    return await jsonRequest.patch(`/post/bookmarked-unbookmarked-post/${postId}`);
}

export const likePost = async (postId) => {
    return await jsonRequest.patch(`/post/like-unlike-post/${postId}`);
}
