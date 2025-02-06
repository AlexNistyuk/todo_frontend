import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import LocalStorageService from "../../services/localStorage";
import AuthService from "../../services/auth";
import TokenService from "../../services/token";


export const fetchSignIn = createAsyncThunk(
    "auth/fetchSignIn",
    async (params) => {
        return await new AuthService().signIn(params)
    }
)

export const fetchSignUp = createAsyncThunk(
    "auth/fetchSignUp",
    async (params) => {
        return await new AuthService().signUp(params)
    }
)


export const verifyToken = createAsyncThunk(
    "auth/verifyToken",
    async () => {
        try{
            await new TokenService().verify()
        } catch (error){
            throw new Error(error)
        }

    }
)

const initialState = {
    data: null,
    status: null,
    isAuthorized: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.isAuthorized = false

            new LocalStorageService().removeTokens()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSignIn.pending, (state) => {
            state.data = null
            state.status = "loading"
            state.isAuthorized = false
        }).addCase(fetchSignIn.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = "loaded"
            state.isAuthorized = true
        }).addCase(fetchSignIn.rejected, (state) => {
            state.data = null
            state.status = "error"
            state.isAuthorized = false
        }).addCase(fetchSignUp.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchSignUp.fulfilled, (state) => {
            state.status = "loaded"
        }).addCase(verifyToken.fulfilled, (state) => {
            state.isAuthorized = true
        }).addCase(verifyToken.rejected, (state) => {
            state.data = null
            state.isAuthorized = false

            new LocalStorageService().removeTokens()
        });
    }
});

export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions

