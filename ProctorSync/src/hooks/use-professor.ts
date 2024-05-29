import {useMutation, useQuery} from "react-query";
import ProfessorApi from "@/APIs/professor-api.ts";
import {IProfessorRequest, IProfessorResponse} from "@/types/types.ts";


export const useProfessor = () => {




	const {mutateAsync: createProfessorMutation, isLoading: professorInsertionIsLoading} = useMutation({
		mutationKey: "createProfessor",
		mutationFn: async (data: IProfessorRequest) => ProfessorApi.createProfessor(data),
		onSuccess: (response) => {
			console.log(response)
		},
		onError: (error) => {
			console.error('Error while creating professor', error)
		}

	})

	const {data, isLoading: professorsAreLoading} = useQuery({
		queryKey: "professors",
		queryFn: async () => await ProfessorApi.getProfessors(),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		}
	})

	const professors: IProfessorResponse[] = data;

	const createProfessor = async (data: IProfessorRequest) => await createProfessorMutation(data);


	return {
		createProfessor,
		professorInsertionIsLoading,
		professors,
		professorsAreLoading

	}

}