import { IJwtPayload } from "@/types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: IJwtPayload = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	roles: []
}

const userState = createSlice({
	name: "authState",
	initialState,
	reducers: {
		setUser: (_state, action: PayloadAction<IJwtPayload>) => {
			return action.payload;
		},
	}
});


export default userState.reducer;
export const {setUser} = userState.actions;