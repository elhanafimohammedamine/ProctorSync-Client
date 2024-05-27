import {useMutation} from "react-query";
import {IAuthRequest} from "@/types/types.ts";
import AuthApi from "@/APIs/auth-api.ts";


export const useAuth = () => {

	const {mutateAsync: authenticate} = useMutation({
		mutationKey: "authenticate",
		mutationFn: async (request: IAuthRequest) => AuthApi.authenticate(request),
		onSuccess: (response) => {
			// Do something with the response
			console.log(response);

		},
		onError: (error) => {
			console.error(error);
		}
	})


	const login = async (request: IAuthRequest) => await authenticate(request);


	return {
		login
	}

}