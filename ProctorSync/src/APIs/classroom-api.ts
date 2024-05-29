import {IClassroomRequest} from "@/types/types.ts";
import axiosInstance from "@/http/axios.ts";


export default {
	createClassRoom: async (classRoom: IClassroomRequest) => {
		const response = await axiosInstance.post("/classroom/create", classRoom);
		return response.data;
	},
	getClassrooms: async () => {
		const response = await axiosInstance.get("/classroom");
		return response.data;
	}
}