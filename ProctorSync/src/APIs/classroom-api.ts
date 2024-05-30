import {IClassroomRequest, IClassroomUpdateRequest} from "@/types/types.ts";
import axiosInstance from "@/http/axios.ts";


export default {
	createClassRoom: async (classRoom: IClassroomRequest) => {
		const response = await axiosInstance.post("/classroom/create", classRoom);
		return response.data;
	},
	getClassrooms: async () => {
		const response = await axiosInstance.get("/classroom");
		return response.data;
	},
	updateClassroom: async (id:string, classroom: IClassroomUpdateRequest) => {
		const response = await axiosInstance.put(`/classroom/update/${id}`, classroom);
		return response.data;
	},
	deleteClassroom: async (id: string) => {
		const response = await axiosInstance.delete(`/classroom/delete/${id}`);
		return response.data;
	},
	getAvailableClassrooms: async (startDateTime: string, endDateTime: string) => {
		const response = await axiosInstance.get(`/classroom/available?startDateTime=${startDateTime}&endDateTime=${endDateTime}`);
		return response.data;
	}
}