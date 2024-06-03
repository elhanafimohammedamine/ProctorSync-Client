import {useMutation, useQuery, useQueryClient} from "react-query";
import AdministratorApi from "@/APIs/administrator-api.ts";
import {IAdministratorRequest, IAdministratorResponse, IAdministratorUpdateRequest} from "@/types/types.ts";




export const useAdministrator = (administratorId?: string) => {


	const queryClient = useQueryClient();

	const {mutateAsync: createAdministratorMutation, isLoading: administratorInsertionIsLoading} = useMutation({
		mutationKey: "createAdministrator",
		mutationFn: async (data: IAdministratorRequest) => AdministratorApi.createAdministrator(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['administrators'])
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

	const { mutateAsync: deleteAdminMutation } = useMutation({
		mutationKey: "deleteAdministrator",
		mutationFn: async (id: string) => AdministratorApi.deleteAdministartor(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries('administrators');
		},
		onError: (error) => {
			console.error(error);
		}
	})


	const { mutateAsync: updateAdministratorMutation } = useMutation({
		mutationKey: "updateAdministrator",
		mutationFn: async (administrator: IAdministratorUpdateRequest) => await AdministratorApi.UpdateAdministrator(administratorId!, administrator),
		onSuccess: async () => {
			queryClient.invalidateQueries(['administrators'])
		},
		onError: (error) => {
			console.error(error);
		}
		
	})


	const administrators: IAdministratorResponse[] = data;
	const createAdministrator = async (data: IAdministratorRequest) => await createAdministratorMutation(data);
	const deleteAdministrator = async (id: string) => await deleteAdminMutation(id);
	const updateAdministrator = async (administrator: IAdministratorUpdateRequest) => await updateAdministratorMutation(administrator);

	return {
		administrators,
		administratorsAreLoading,
		createAdministrator,
		administratorInsertionIsLoading,
		deleteAdministrator,
		updateAdministrator

	};




}