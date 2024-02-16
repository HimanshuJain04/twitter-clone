import http from "./http-common.js";


export const signup = async (data) => {
    return await http.post("/auth/signup", data);
}


export const login = async (data) => {
    return await http.post("/auth/login", data);
}


export const logout = async (data) => {
    return await http.post("/auth/logout", data);
}


export const verifyOtp = async (data) => {
    return await http.post("/auth/verify-otp", data);
}


export const sendOtpToEmail = async (data) => {
    return await http.post("/auth/resend-otp", { email: data });
}


// this one  is for reset password
export const resetPassword = async (data) => {
    return await http.patch("/auth/reset-password", { email: data });
}


// this one is for forgot password
export const changePassword = async (data) => {
    return await http.patch("/auth/change-password", data);
}