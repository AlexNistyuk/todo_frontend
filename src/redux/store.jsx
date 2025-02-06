import { configureStore } from "@reduxjs/toolkit"
import {authReducer} from "./slices/auth";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";


const authPersistConfig = {
    key: 'auth',
    storage,
}
const persistedReducer = persistReducer(authPersistConfig, authReducer)



export const store = configureStore({
    reducer: {
        auth: persistedReducer
    }
})

export const persistor = persistStore(store)
