import axiosInstance from "@/http/axios.ts";
import {IAdministratorRequest} from "@/types/types.ts";


export default {
	getAdministrators: async () => {
		const response = await axiosInstance.get("/administrator");
		return response.data;
	},
	createAdministrator: async (data: IAdministratorRequest) => {
		const response = await axiosInstance.post("/administrator/create", data);
		return response.data;
	}
}