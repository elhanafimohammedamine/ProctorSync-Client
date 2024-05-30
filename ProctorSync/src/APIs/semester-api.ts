import axiosInstance from "@/http/axios.ts";


export default {
	getSemesters: async () => {
		const response = await axiosInstance.get("/semester");
		return response.data;
	}
}