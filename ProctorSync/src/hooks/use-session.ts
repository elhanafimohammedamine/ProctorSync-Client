import {useQuery} from "react-query";
import sessionApi from "@/APIs/session-api.ts";
import {ISessionResponse} from "@/types/types.ts";


export const useSession = () => {


	const {data} = useQuery({
		queryKey: "sessions",
		queryFn: async () => await sessionApi.getSessions(),
		onSuccess: (data) => {
			console.log(data)
		},
		onError: (error) => {
			console.error(error)
		}
	})

	const sessions: ISessionResponse[] = data;

	return {
		sessions
	}
}