import {useMutation, useQuery, useQueryClient} from "react-query";
import ProfessorApi from "@/APIs/professor-api.ts";
import {IProfessorRequest, IProfessorResponse, IProfessorUpdateRequest} from "@/types/types.ts";


export const useProfessor = (professorId?: string) => {


	const queryClient = useQueryClient();


	const {mutateAsync: createProfessorMutation, isLoading: professorInsertionIsLoading} = useMutation({
		mutationKey: "createProfessor",
		mutationFn: async (data: IProfessorRequest) => ProfessorApi.createProfessor(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries(['professors'])
		},
		onError: (error) => {
			console.error('Error while creating professor', error)
		}

	})

	const {data, isLoading: professorsAreLoading} = useQuery({
		queryKey: "professors",
		queryFn: async () => await ProfessorApi.getProfessors(),
		onError: (error) => {
			console.error(error);
		}
	})

	const {data: professorsWithoutGroup, isLoading: professorsWithoutGroupsAreLoading} = useQuery({
		queryKey: "professorsWithoutGroups",
		queryFn: async () => await ProfessorApi.getProfessorsWithGroups(),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		}
	});

	const { mutateAsync: deleteProfessorMutation } = useMutation({
		mutationKey: "deleteProfessor",
		mutationFn: async (id: string) => await ProfessorApi.deleteProfessor(id),
		onSuccess: async (data) => {
			queryClient.invalidateQueries(['professors'])
			console.log(data)
		},
		onError: (error) => {
			console.error(error);
		}
	})


	const { mutateAsync: updateProfMutation } = useMutation({
		mutationKey: "updateProfessor",
		mutationFn: async (professor: IProfessorUpdateRequest) => await ProfessorApi.updateProfessor(professorId!, professor),
		onSuccess: async (res) => {
			queryClient.invalidateQueries(['professors'])
			console.log(res)
		},
		onError: (error) => {
			console.error(error);
		},
	})

	const professors: IProfessorResponse[] = data;
	const professorsWithoutGroups: IProfessorResponse[] = professorsWithoutGroup;

	const createProfessor = async (data: IProfessorRequest) => await createProfessorMutation(data);
	const deleteProfessor = async (id: string) => await deleteProfessorMutation(id);
	const updateProfessor = async (professor: IProfessorUpdateRequest) => await updateProfMutation(professor);


	return {
		createProfessor,
		professorInsertionIsLoading,
		professors,
		professorsAreLoading,
		professorsWithoutGroups,
		professorsWithoutGroupsAreLoading,
		deleteProfessor,
		updateProfessor

	}

}