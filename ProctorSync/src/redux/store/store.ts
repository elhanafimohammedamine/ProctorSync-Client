import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/redux/state/authSlice.ts";
import userReducer from "@/redux/state/userSlice.ts"
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";



const persistConfig = {
	key: 'root',
	storage,
};

const persistedAuth = persistReducer(persistConfig, authReducer);
const persistedUser = persistReducer(persistConfig, userReducer)

export const store = configureStore({
	reducer: {
		authState: persistedAuth,
		userState: persistedUser,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;