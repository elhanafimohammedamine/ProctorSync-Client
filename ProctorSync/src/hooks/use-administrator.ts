import {useMutation, useQuery} from "react-query";
import AdministratorApi from "@/APIs/administrator-api.ts";
import {IAdministratorRequest, IAdministratorResponse} from "@/types/types.ts";



export const useAdministrator = () => {



	const {mutateAsync: createAdministratorMutation, isLoading: administratorInsertionIsLoading} = useMutation({
		mutationKey: "createAdministrator",
		mutationFn: async (data: IAdministratorRequest) => AdministratorApi.createAdministrator(data),
		onSuccess: (response) => {
			console.log(response)
		},
		onError: (error) => {
			console.error('Error while creating professor', error)
		}

	})

	const {data, isLoading: administratorsAreLoading} = useQuery({
		queryKey: "administrators",
		queryFn: async () => AdministratorApi.getAdministrators(),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		}
	});


	const administrators: IAdministratorResponse[] = data;
	const createAdministrator = async (data: IAdministratorRequest) => await createAdministratorMutation(data);

	return {
		administrators,
		administratorsAreLoading,
		createAdministrator,
		administratorInsertionIsLoading

	};




}