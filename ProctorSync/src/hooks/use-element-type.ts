import {useQuery} from "react-query";
import ElementTypeApi from "@/APIs/element-type-api.ts";
import {IElementType} from "@/types/types.ts";


export const useElementType = () => {


	const {data} = useQuery({
		queryKey: 'elementTypes',
		queryFn: async () => await ElementTypeApi.getElementsTypes(),
		onSuccess: (data) => {
			console.log(data)
		}
	})

	const elementTypes: IElementType[] = data;

	return {
		elementTypes
	}
}