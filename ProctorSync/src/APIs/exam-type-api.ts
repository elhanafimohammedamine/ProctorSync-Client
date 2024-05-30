import axiosInstance from "@/http/axios.ts";


export default {
	getExamTypes: async () => {
		const response = await axiosInstance.get('/exam-type')
		return response.data;
	}
}