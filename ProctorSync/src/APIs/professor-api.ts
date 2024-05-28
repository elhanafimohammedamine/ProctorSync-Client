import {IProfessorRequest} from "@/types/types.ts";
import axiosInstance from "@/http/axios.ts";


export default {
	createProfessor: async (data: IProfessorRequest) => {
		return await axiosInstance.post("/professor/create", data);
	}
}