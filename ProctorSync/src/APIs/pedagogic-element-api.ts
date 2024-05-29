import {IPedagogicElementRequest, IPedagogicElementUpdateRequest} from "@/types/types.ts";
import axiosInstance from "@/http/axios.ts";


export default  {
	createPedagogicElement: async (pedagogicElement: IPedagogicElementRequest) => {
		const  response = await axiosInstance.post("/pedagogic-element/create", pedagogicElement);
		return response.data;
	},
	getPedagogicElements: async () => {
		const  response = await axiosInstance.get("/pedagogic-element");
		return response.data;
	},
	updatePedagogicElement: async (id: string, pedagogicElement: IPedagogicElementUpdateRequest) => {
		console.log('debug : ', 'id : ', id, 'pedagogicElementId : ', pedagogicElement?.id)
		const  response = await axiosInstance.put(`/pedagogic-element/update/${id}`, pedagogicElement);
		return response.data;
	}
}