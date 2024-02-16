import http from "./http-common.js";


export const signup = async (data) => {
    return await http.post("/auth/signup", data);
}


export const login = (data) => {
    return http.post("/auth/login", data);
}


export const logout = (data) => {
    return http.post("/auth/logout", data);
}


export const verifyOtp = (data) => {
    return http.post("/auth/verify-otp", data);
}


export const sendOtpToEmail = (data) => {
    return http.post("/auth/resend-otp", data);
}


// this one  is for reset password
export const resetPassword = (data) => {
    return http.patch("/auth/reset-password", data);
}


// this one is for forgot password
export const changePassword = (data) => {
    return http.patch("/auth/change-password", data);
}