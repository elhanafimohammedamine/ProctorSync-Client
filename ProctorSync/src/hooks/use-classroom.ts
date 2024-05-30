import {useMutation, useQuery, useQueryClient} from "react-query";
import {IClassroomRequest, IClassroomResponse, IClassroomUpdateRequest} from "@/types/types.ts";
import ClassroomApi from "@/APIs/classroom-api.ts";


export const useClassroom = (startDateTime?: string, endDateTime?:string, classroomId?: string) => {

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

	const {mutateAsync: updateClassroomMutation, isLoading: updateClassroomIsLoading} = useMutation({
		mutationKey: "updateClassroom",
		mutationFn: async (classroom : IClassroomUpdateRequest) => await ClassroomApi.updateClassroom(classroomId!, classroom),
		onSuccess: async (response) => {
			await queryClient.invalidateQueries("classrooms");
			console.log(response)
		},
		onError: (error) => {
			console.error('Error while updating classroom', error)
		}
	});

	const {mutateAsync: deleteClassroomMutation, isLoading: deleteClassroomIsLoading} = useMutation({
		mutationKey: "deleteClassroom",
		mutationFn: async (classroomId : string) => await ClassroomApi.deleteClassroom(classroomId),
		onSuccess: async (response) => {
			await queryClient.invalidateQueries("classrooms");
			console.log(response)
		},
		onError: (error) => {
			console.error('Error while deleting classroom', error)
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


	const {data: availableClassroomsData, isLoading: availableClassroomsAreLoading} = useQuery({
		queryKey: "availableClassrooms",
		queryFn: async () => await ClassroomApi.getAvailableClassrooms(startDateTime!, endDateTime!),
		onSuccess: (response) => {
			console.log(response)

		},
		onError: (error) => {
			console.error('Error while fetching available classrooms', error)
		},
		enabled: !!startDateTime && !!endDateTime
	})

	const availableClassrooms : IClassroomResponse[] = availableClassroomsData;


	const createClassroom = async (classroom: IClassroomRequest) => await createClassroomMutation(classroom);
	const updateClassroom = async (classroom: IClassroomUpdateRequest) => await updateClassroomMutation(classroom);
	const deleteClassroom = async (classroomId: string) => await deleteClassroomMutation(classroomId);
	return {
		createClassroom,
		insertClassroomIsLoading,
		classrooms,
		classroomsAreLoading,
		updateClassroom,
		updateClassroomIsLoading,
		deleteClassroom,
		deleteClassroomIsLoading,
		availableClassrooms,
		availableClassroomsAreLoading
	}
}


