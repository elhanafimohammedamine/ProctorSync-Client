import axiosInstance from "@/http/axios.ts";


export default {
	getElementsTypes: async () => {
		const response = await axiosInstance.get("/element-type");
		return response.data;
	}

}