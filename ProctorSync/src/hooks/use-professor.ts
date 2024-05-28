import {useMutation} from "react-query";
import ProfessorApi from "@/APIs/professor-api.ts";
import {IProfessorRequest} from "@/types/types.ts";


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

	const createProfessor = async (data: IProfessorRequest) => await createProfessorMutation(data);


	return {
		createProfessor,
		professorInsertionIsLoading
	}

}