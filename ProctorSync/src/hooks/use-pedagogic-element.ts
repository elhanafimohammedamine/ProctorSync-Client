import {useMutation, useQuery, useQueryClient} from "react-query";
import PedagogicElementApi from "@/APIs/pedagogic-element-api.ts";
import {IPedagogicElementRequest, IPedagogicElementResponse, IPedagogicElementUpdateRequest} from "@/types/types.ts";


export const usePedagogicElement = (pedagogicalElementId?: string) => {


	const queryClient = useQueryClient();

	const {data, isLoading: pedagogicElementsAreLoading} = useQuery({

		queryKey: "pedagogicElements",
		queryFn: async () => await PedagogicElementApi.getPedagogicElements(),
		onSuccess: async (response) => {
			console.log(response)
		},
		onError: async (error) => {
			console.error(error)
		}
	})

	const pedagogicElements: IPedagogicElementResponse[] = data;

	const {mutateAsync: createPedagogicElementMutation, isLoading: pedagogicElementInsertionIsLoading} = useMutation( {
		mutationKey: "createPedagogicElement",
		mutationFn: async (pedagogicElement: IPedagogicElementRequest) => await PedagogicElementApi.createPedagogicElement(pedagogicElement),
		onSuccess: async (response) => {
			await queryClient.invalidateQueries("pedagogicElements")
			console.log(response)
		},
		onError: async (error) => {
			console.error(error)
		}

	})

	const {mutateAsync: updatePedagogicElementMutation, isLoading: pedagogicElementUpdateIsLoading} = useMutation( {
		mutationKey: "updatePedagogicElement",
		mutationFn: async (pedagogicElement: IPedagogicElementUpdateRequest) => await PedagogicElementApi.updatePedagogicElement(pedagogicalElementId!, pedagogicElement),
		onSuccess: async (response) => {
			await queryClient.invalidateQueries("pedagogicElements")
			console.log(response)
		},
		onError: async (error) => {
			console.error(error)

		}


	})

	const createPedagogicElement = async (pedagogicElement: IPedagogicElementRequest) => createPedagogicElementMutation(pedagogicElement);
	const updatePedagogicElement = async (pedagogicElement: IPedagogicElementUpdateRequest) => updatePedagogicElementMutation(pedagogicElement);

	return {
		createPedagogicElement,
		pedagogicElementInsertionIsLoading,
		pedagogicElements,
		pedagogicElementsAreLoading,
		updatePedagogicElement,
		pedagogicElementUpdateIsLoading
	}


}