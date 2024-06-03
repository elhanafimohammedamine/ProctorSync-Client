import {IProfessorRequest} from "@/types/types.ts";
import axiosInstance from "@/http/axios.ts";


export default {
	createProfessor: async (data: IProfessorRequest) => {
		const response = await axiosInstance.post("/professor/create", data);
		return response.data;
	},
	getProfessors: async () => {
		const response = await axiosInstance.get("/professor");
		return response.data;
	},
	getProfessorsWithGroups: async () => {
		const response = await axiosInstance.get("/professor/professors-without-group");
		return response.data;
	},
	deleteProfessor: async (id: string) => {
		const response = await axiosInstance.delete(`/professor/delete/${id}`)
		return response.data;
	},
	updateProfessor: async (id: string, professor: IProfessorUpdateRequest) => {
		const response = await axiosInstance.put(`/professor/update/${id}`, professor);
		return response.data;
	}
}