import http from "./http-common.js";


export const signup = (data) => {
    return http.post("/signup", data);
}


export const login = (data) => {
    return http.post("/login", data);
}


export const logout = (data) => {
    return http.post("/logout", data);
}


export const verifyOtp = (data) => {
    return http.post("/verify-otp", data);
}


export const sendOtpToEmail = (data) => {
    return http.post("/resend-otp", data);
}


// this one  is for reset password
export const resetPassword = (data) => {
    return http.patch("/reset-password", data);
}


// this one is for forgot password
export const changePassword = (data) => {
    return http.patch("/change-password", data);
}