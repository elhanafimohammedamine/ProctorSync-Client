import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {CheckIcon, Plus} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import Search from "@/components/Search.tsx";
import {ReactNode, useState} from "react";
import {users} from "@/data/users.tsx";
import {IUser} from "@/types/types.ts";
import {buttonStyle} from "@/assets/style/CustomStyles.ts";

interface SelectPatientDialogProps {
	trigger: ReactNode,
}

export default function SelectMemberDialog({trigger}: SelectPatientDialogProps) {

	const [selectedUsers, setSelectedUsers] = useState<IUser[]>([])
	const [filteredUsers, setFilteredUsers] = useState(users);
	const handleModalSearchInputChange = (query: string) => {
		setFilteredUsers(users
			.filter((user) =>
				user.firstName.toLowerCase().includes(query.toLowerCase()) ||
				user.lastName.toLowerCase().includes(query.toLowerCase())
			)
		)
	}



	return (
		<Dialog>
			<DialogTrigger asChild className={cn(buttonStyle)}>
				{trigger}
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Sélectionner un personnel</DialogTitle>
					<DialogDescription>
						Vous pouvez chercher un personnel par son nom
					</DialogDescription>
				</DialogHeader>
				<Search placeholder="Recherche personnel..." onChange={handleModalSearchInputChange} />
				<div >
					<ScrollArea className="max-h-[400px]">
						<ToggleGroup
							className="w-full block space-y-2" type="multiple"
							onValueChange={(value) => {
								if(value) {
									setSelectedUsers([...selectedUsers, ...value.map((user) => JSON.parse(user))])
								}
							}}
						>
							{filteredUsers.map((user) => (
								<ToggleGroupItem
									variant="outline"
									className="w-full h-full"
									key={user.id}
									value={JSON.stringify(user!)}
									aria-label={`Toggle ${user.id}`}
								>
									<div className="w-full flex items-center py-3">
										<Avatar className="size-9">
											<AvatarImage src="/avatars/04.png" alt="Avatar" />
											<AvatarFallback>
												{user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm text-start font-medium leading-none">{user.firstName} {user.lastName}</p>
											<p className="text-xs text-start text-muted-foreground">
												{user.email}
											</p>
										</div>
									</div>
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											selectedUsers?.some(u => u.id === user.id) ? "opacity-100" : "opacity-0"
										)}
									/>
								</ToggleGroupItem>
							))}
						</ToggleGroup>
					</ScrollArea>
				</div>
				<DialogFooter className="justify-end mt-5">
					<DialogClose asChild>
						<div className="items-center flex space-x-2">
							<Button size="sm" variant="outline" type="button" onClick={() => setSelectedUsers([])}>Fermer</Button>
							<Button size="sm" type="button" className="dark:bg-secondary flex gap-x-1 dark:text-white" onClick={() => {}}>
								<Plus className="size-4" />
								Ajouter
							</Button>
						</div>
					</DialogClose>
				</DialogFooter>

			</DialogContent>
		</Dialog>
	)
}