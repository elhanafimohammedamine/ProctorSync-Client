import axiosInstance from "@/http/axios.ts";

export default {
	getSessions: async () => {
		const response = await axiosInstance.get('/session')
		return response.data;
	}
}