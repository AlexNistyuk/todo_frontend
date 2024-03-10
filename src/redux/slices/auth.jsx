import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAuth = createAsyncThunk(
    "auth/fetchUserData",
    async (params) => {
        const {data} = await axios.post("http://localhost:8001/api/v1/auth/login/", params)
        const response = await axios.get("http://localhost:8001/api/v1/token/user-info/", {
            headers: {
                Authorization: `Bearer ${data.access_token}`
            }
        })

        return {
            tokens: data,
            user: response.data
        }
    }
)

export const verifyToken = createAsyncThunk(
    "auth/verifyToken",
    async () => {
        const access_token = window.localStorage.getItem("access_token")

        const {data} = await axios.get("http://localhost:8001/api/v1/token/verify/", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    }
)


const initialState = {
    data: null,
    status: null,
    isAuthorized: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.isAuthorized = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.data = null
            state.status = "loading"
            state.isAuthorized = false
        }).addCase(fetchAuth.fulfilled, (state, action) => {
            state.data = action.payload.user
            state.status = "loaded"
            state.isAuthorized = true
        }).addCase(fetchAuth.rejected, (state) => {
            state.data = null
            state.status = "error"
            state.isAuthorized = false
        }).addCase(verifyToken.pending, (state) => {
            state.status = "loading"
        }).addCase(verifyToken.fulfilled, (state) => {
            state.status = "loaded"
            state.isAuthorized = true
        }).addCase(verifyToken.rejected, (state) => {
            state.data = null
            state.status = "error"
            state.isAuthorized = false
        });
    }
});

export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions

