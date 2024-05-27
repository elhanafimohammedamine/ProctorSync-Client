import {IAuthRequest} from "@/types/types.ts";
import axiosInstance from "@/http/axios.ts";


export default {
	authenticate: async (authRequest: IAuthRequest) => {
		return await axiosInstance.post('/auth/authenticate', authRequest);
	}
}