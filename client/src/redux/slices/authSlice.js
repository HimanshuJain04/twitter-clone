import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';

import {
    login,
    logout,
} from "../../services/authService.js";


// login
export const authLogin = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            return await login(data);
        } catch (error) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                // Handle other types of errors (e.g., network error)
                return thunkAPI.rejectWithValue({ message: error.message });
            }
        }
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
    user: null,
    isError: null,
};


const authSlice = createSlice({

    name: "auth",
    initialState,
    extraReducers: (builder) => {

        // login
        builder.addCase(authLogin.pending, (state) => {
            state.isLoading = true;
        });


        builder.addCase(authLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = null;
            console.log("Payload : ", action.payload)
            state.data = action.payload;
        });

        builder.addCase(authLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })


        // logout
        builder.addCase(authLogout.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(authLogout.fulfilled, (state) => {
            state.isLoading = false;
            state.data = null;
        });

        builder.addCase(authLogout.rejected, (state) => {
            state.isError = true;
        })
    }
});



export default authSlice.reducer;