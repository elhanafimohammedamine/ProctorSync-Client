import axiosInstance from "@/http/axios.ts";
import {IAdministratorRequest, IAdministratorUpdateRequest} from "@/types/types.ts";


export default {
	getAdministrators: async () => {
		const response = await axiosInstance.get("/administrator");
		return response.data;
	},
	createAdministrator: async (data: IAdministratorRequest) => {
		const response = await axiosInstance.post("/administrator/create", data);
		return response.data;
	},
	deleteAdministartor: async (id: string) => {
		const response = await axiosInstance.delete(`/administrator/delete/${id}`);
		return response.data;
	},
	UpdateAdministrator: async (id: string, administrator: IAdministratorUpdateRequest) => {
		const response = await axiosInstance.put(`/administrator/update/${id}`, administrator);
		return response.data;
	}
}