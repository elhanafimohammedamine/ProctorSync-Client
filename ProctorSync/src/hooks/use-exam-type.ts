import {useQuery} from "react-query";
import {IExamTypeResponse,} from "@/types/types.ts";
import examTypeApi from "@/APIs/exam-type-api.ts";


export const useExamType = () => {


	const {data} = useQuery({
		queryKey: "examTypes",
		queryFn: async () => await examTypeApi.getExamTypes(),
		onSuccess: (data) => {
			console.log(data)
		},
		onError: (error) => {
			console.error('Failed to get exam types : ', error)
		}
	})

	const examTypes: IExamTypeResponse[] = data;

	return {
		examTypes
	}
}