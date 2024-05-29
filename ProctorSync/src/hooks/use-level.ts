import {useQuery} from "react-query";
import LevelApi from "@/APIs/level-api.ts";
import {ILevel} from "@/types/types.ts";


export const useLevel = () => {


	const {data} = useQuery({
		queryKey: 'levels',
		queryFn: async () => await LevelApi.getLevels(),
		onSuccess: (data) => {
			console.log(data)
		},
		onError: (error) => {
			console.log(error)
		}
	});

	const levels: ILevel[] = data;

	return {levels}

}