import axiosInstance from "@/http/axios.ts";


export default {
	getBranches: async () => {
		const response =  await axiosInstance.get("/branch")
		return response.data
	}
}