import {useQuery} from "react-query";
import DepartmentPi from "@/APIs/department-pi.ts";
import {IDepartment} from "@/types/types.ts";


export const useDepartment = () => {



	const {data} = useQuery({
		queryKey: "departments",
		queryFn: async () => await DepartmentPi.getDepartments(),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		}
	})

	const departments: IDepartment[] = data || []

	return {
		departments
	}
}