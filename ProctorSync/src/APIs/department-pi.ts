import axiosInstance from "@/http/axios.ts";


export default {
	getDepartments: async () => {
		const response = await axiosInstance.get("/department")
		return response.data
	}
}