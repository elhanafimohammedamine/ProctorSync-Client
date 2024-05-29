import { useMutation, useQuery, useQueryClient} from "react-query";
import GroupApi from "@/APIs/group-api.ts";
import {IGroupRequest, IGroupResponse} from "@/types/types.ts";


export const useGroup = (groupId?:string) => {


	const queryClient = useQueryClient();

	const {mutateAsync: createGroupMutation, isLoading: insertGroupIsLoading} = useMutation({
		mutationKey: "createGroup",
		mutationFn: async (group : IGroupRequest) => await GroupApi.createGroup(group),
		onSuccess: async (response) => {
			await queryClient.invalidateQueries("groups");
			console.log(response)
		},
		onError: (error) => {
			console.error('Error while creating group', error)
		}

	})

	// Get all groups
	const {data: Groups, isLoading: groupsAreLoading} = useQuery({
		queryKey: "groups",
		queryFn: async () => GroupApi.getGroups(),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		}
	});

	const groups: IGroupResponse[] = Groups;


	// get group by id
	const {data, isLoading: groupIsLoading} = useQuery({
		queryKey: "group",
		queryFn: async ()  => GroupApi.getGroupById(groupId!),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		},

		enabled: !!groupId,
	});

	const group: IGroupResponse = data;



	const {mutateAsync: addMembersMutation, isLoading: addMembersIsLoading} = useMutation({
		mutationKey: "addMembers",
		mutationFn: async (members: string[]) => await GroupApi.addMemebers(groupId!, members),
		onSuccess: async (response) => {
			await queryClient.invalidateQueries("group");
			console.log(response)
		},
		onError: (error) => {
			console.error('Error while adding members to group', error)
		}
	});


	const createGroup = async (group : IGroupRequest) => await createGroupMutation(group);
	const addMembers = async (members: string[]) => await addMembersMutation(members);


	return {
		createGroup,
		insertGroupIsLoading,
		groups,
		groupsAreLoading,
		group,
		groupIsLoading,
		addMembers,
		addMembersIsLoading
	}

}