import axiosInstance from "@/http/axios.ts";
import {IGroupRequest} from "@/types/types.ts";


export default {
	createGroup: async (group: IGroupRequest) => {
		const response = await axiosInstance.post("/group/create", group);
		return response.data;
	},
	getGroups: async () => {
		const response = await axiosInstance.get("/group");
		return response.data;
	},
	getGroupById : async (id: string) => {
		const response = await axiosInstance.get(`/group/${id}`);
		return response.data;
	},
	addMemebers: async (groupId: string, members: string[]) => {
		const response = await axiosInstance.post(`/group/add-members/${groupId}`, members);
		return response.data;
	},
	deleteGroup: async (groupId: string) => {
		const response = await axiosInstance.delete(`/group/delete/${groupId}`);
		return response.data;
	}
}