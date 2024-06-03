import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface IAuthState {
	token: string | null;
}

const initialState: IAuthState = {
	token: null
};



const authSlice = createSlice({
	name: "authState",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string | null>) => {
			state.token = action.payload;
		}
	}
});


export const isAuthenticated = (state: { authState: IAuthState }) => state.authState.token != '';
export default authSlice.reducer;
export const {setToken} = authSlice.actions;