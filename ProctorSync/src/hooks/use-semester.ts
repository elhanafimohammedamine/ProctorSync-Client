

import {useQuery} from "react-query";
import {ISemesterResponse} from "@/types/types.ts";
import semesterApi from "@/APIs/semester-api.ts";


export const useSemester = () => {


	const {data} = useQuery({
		queryKey: "semesters",
		queryFn: async () => await semesterApi.getSemesters(),
		onSuccess: (data) => {
			console.log(data)
		},
		onError: (error) => {
			console.error(error)
		}
	})

	const semesters: ISemesterResponse[] = data;

	return {
		semesters
	}
}