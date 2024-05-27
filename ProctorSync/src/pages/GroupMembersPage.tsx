import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {LogOut, UserRoundPlus} from "lucide-react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import SelectMemberDialog from "@/components/SelectMemberDialog.tsx";
import OutMemberConfirmationDialog from "@/components/OutMemberConfirmationDialog.tsx";
import {useState} from "react";

const people = [
	{
		name: 'Leslie Alexander',
		email: 'leslie.alexander@example.com',
		role: 'Co-Founder / CEO',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: '3h ago',
		lastSeenDateTime: '2023-01-23T13:23Z',
	},
	{
		name: 'Michael Foster',
		email: 'michael.foster@example.com',
		role: 'Co-Founder / CTO',
		imageUrl:
			'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: '3h ago',
		lastSeenDateTime: '2023-01-23T13:23Z',
	},
	{
		name: 'Dries Vincent',
		email: 'dries.vincent@example.com',
		role: 'Business Relations',
		imageUrl:
			'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: null,
	},
	{
		name: 'Lindsay Walton',
		email: 'lindsay.walton@example.com',
		role: 'Front-end Developer',
		imageUrl:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: '3h ago',
		lastSeenDateTime: '2023-01-23T13:23Z',
	},
	{
		name: 'Courtney Henry',
		email: 'courtney.henry@example.com',
		role: 'Designer',
		imageUrl:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: '3h ago',
		lastSeenDateTime: '2023-01-23T13:23Z',
	},
	{
		name: 'Tom Cook',
		email: 'tom.cook@example.com',
		role: 'Director of Product',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		lastSeen: null,
	},
]

export default function GroupMembersPage() {

	const [isOpen, setOpen] = useState(false);
	const toggleDialog = () => setOpen(!isOpen)


	return (
		<div className="px-6">
			<div className="flex items-center justify-between mb-5">
				<div>
					<h3 className="text-xl font-semibold text-primary">Groupe name</h3>
					<span className="text-sm text-muted-foreground flex items-center mt-2 gap-x-1.5">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-primary">
							<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
						</svg>
						12 membres
					</span>
					<p className="text-muted-foreground text-sm mt-1">
						A software that develops products for software developers and developments.
					</p>
				</div>
				<SelectMemberDialog trigger={
					<div><UserRoundPlus className="size-4 mr-1.5" />
						Nouveau membre</div>
				} />
			</div>
			<ul role="list" className="space-y-2">
				{people.map((person) => (
					<li key={person.email} className="flex justify-between items-center bg-card rounded-xl px-6 gap-x-6 py-3">
						<div className="flex justify-center items-center min-w-0 gap-x-4">
							<Avatar className="rounded-lg">
								<AvatarFallback className="rounded-lg bg-gray-200 dark:bg-muted-foreground/15 font-medium">CN</AvatarFallback>
							</Avatar>
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 ">{person.name}</p>
								<p className="truncate text-xs leading-5 text-muted-foreground">{person.email}</p>
								<p className="truncate text-xs leading-5 text-muted-foreground">0611376395</p>
							</div>
						</div>
						<div className="flex items-center flex-row space-x-5">
							<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
								<p className="text-sm leading-6 dark:text-gray-100 text-gray-900">Enseignant</p>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
									</svg>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem className="flex items-center gap-x-1.5 text-sm text-red-600" onClick={toggleDialog}>
										<LogOut className="size-4 rotate-180" />
										Sortir du groupe
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<OutMemberConfirmationDialog isOpen={isOpen} toggleOpen={toggleDialog}/>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}