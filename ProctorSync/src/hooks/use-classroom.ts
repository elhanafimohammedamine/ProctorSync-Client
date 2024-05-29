import {useMutation, useQuery, useQueryClient} from "react-query";
import {IClassroomRequest, IClassroomResponse} from "@/types/types.ts";
import ClassroomApi from "@/APIs/classroom-api.ts";


export const useClassroom = () => {

	const queryClient = useQueryClient();


	const {mutateAsync: createClassroomMutation, isLoading: insertClassroomIsLoading} = useMutation({
		mutationKey: "createClassroom",
		mutationFn: async (classroom : IClassroomRequest) => await ClassroomApi.createClassRoom(classroom),
		onSuccess: async (response) => {
			await queryClient.invalidateQueries("classrooms");
			console.log(response)
		},
		onError: (error) => {
			console.error('Error while creating classroom', error)
		}
	});


	const {data, isLoading: classroomsAreLoading} = useQuery({
		queryKey: "classrooms",
		queryFn: async () => await ClassroomApi.getClassrooms(),
		onSuccess: (response) => {
			console.log(response)

		},
		onError: (error) => {
			console.error('Error while fetching classrooms', error)
		}
	});


	const classrooms : IClassroomResponse[] = data;


	const createClassroom = async (classroom: IClassroomRequest) => await createClassroomMutation(classroom);

	return {
		createClassroom,
		insertClassroomIsLoading,
		classrooms,
		classroomsAreLoading
	}
}


