import {useMutation} from "react-query";
import {IAuthRequest, IJwtPayload} from "@/types/types.ts";
import AuthApi from "@/APIs/auth-api.ts";
import { useDispatch, useSelector } from "react-redux";

import { setToken, isAuthenticated } from "@/redux/state/authSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { initialState, setUser } from "@/redux/state/userSlice";


export const useAuth = () => {

	const dispatch = useDispatch();
	const userIsAuthenticated = useSelector(isAuthenticated)
	const navigate = useNavigate();

	const {mutateAsync: authenticate} = useMutation({
		mutationKey: "authenticate",
		mutationFn: async (request: IAuthRequest) => AuthApi.authenticate(request),
		onSuccess: (response) => {
			// Set JWT token
			dispatch(setToken(response.data['access-token']))

			// Decode token and persist the user payload
			const paylaod = jwtDecode<IJwtPayload>(response.data['access-token'])
			dispatch(setUser(paylaod))

			// Redirect
			navigate('/')

		},
		onError: (error) => {
			console.error(error);
		}
	})

	const logout = () => {
		if (userIsAuthenticated) {
			dispatch(setToken(null))
			dispatch(setUser(initialState))
		}
		navigate('/login')
	}

	const login = async (request: IAuthRequest) => await authenticate(request);


	return {
		login,
		logout
	}

}