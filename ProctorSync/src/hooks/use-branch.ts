import {useQuery} from "react-query";
import BranchApi from "@/APIs/branch-api.ts";
import {IBranch} from "@/types/types.ts";


export const useBranch = () => {




	const {data} = useQuery({
		queryKey: "branches",
		queryFn: async () => await BranchApi.getBranches(),
		onSuccess: (data) => {
			console.log(data)
		},
		onError: (error) => {
			console.error(error)
		}
	})

	const branches: IBranch[] = data || []

	return {
		branches
	}

}