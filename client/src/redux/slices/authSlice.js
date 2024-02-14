import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;


export const authLogin = createAsyncThunk("authLogin", async (data) => {
    const res = await axios.post(`${BASE_URL}/auth/signup`, data);
    console.log("response: ", res)
    return { response: res.data, tatus: res.status };
});


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(authLogin.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(authLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("Payload: ", action.payload)
            state.data = action.payload;
        })
        builder.addCase(authLogin.rejected, (state, action) => {
            state.isError = true;
        })
    }
});



export default authSlice.reducer;