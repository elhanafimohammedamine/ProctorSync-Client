import axiosInstance from "@/http/axios.ts";


export default {
	getLevels : async () => {
		const response = await axiosInstance.get('/level')
		return response.data;
	}
}