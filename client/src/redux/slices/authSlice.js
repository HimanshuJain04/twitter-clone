import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';

import {
    signup,
    login,
    logout,
} from "../../services/authService.js";


// signup
export const authSignup = createAsyncThunk(
    "auth/signup",
    async (data) => {
        const res = await signup(data);
        return res;
    }
);


// login
export const authLogin = createAsyncThunk(
    "auth/login",
    async (data) => {
        const res = await login(data);
        return res;
    }
);


// logout
export const authLogout = createAsyncThunk(
    "auth/logout",
    async (data) => {
        const res = await logout(data);
        return res;
    }
);



// Initial State of slice
const initialState = {
    isLoading: false,
    data: [],
    isError: false
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(authSignup.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(authSignup.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("Payload: ", action.payload)
            state.data = action.payload.data;
        });

        builder.addCase(authSignup.rejected, (state) => {
            state.isError = true;
        })
    }
});



export default authSlice.reducer;