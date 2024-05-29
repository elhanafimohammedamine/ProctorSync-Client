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
import {ReactNode, useEffect, useMemo, useState} from "react";
import {IProfessorResponse, } from "@/types/types.ts";
import {buttonStyle} from "@/assets/style/CustomStyles.ts";
import {useGroup} from "@/hooks/use-group.ts";
import {useProfessor} from "@/hooks/use-professor.ts";

interface SelectPatientDialogProps {
	trigger: ReactNode,
	professorsInGroup: IProfessorResponse[],
	groupId: string

}

export default function SelectMemberDialog({trigger, groupId, professorsInGroup}: SelectPatientDialogProps) {
	const { professors } = useProfessor();
	const { addMembers } = useGroup(groupId);
	const [selectedProfessors, setSelectedProfessors] = useState<IProfessorResponse[]>([]);

// Use a memoized value to avoid recalculating unless dependencies change
	const initialProfessors = useMemo(() => {
		return professors?.filter(
			(prof) => !professorsInGroup?.some((profInGroup) => profInGroup?.id === prof?.id)
		) || [];
	}, [professors, professorsInGroup]);

// Initialize state with the memoized initialProfessors
	const [filteredProfessors, setFilteredProfessors] = useState<IProfessorResponse[]>(initialProfessors);

// Optionally, if you want filteredProfessors to be in sync with initialProfessors when professors or professorsInGroup change
	useEffect(() => {
		setFilteredProfessors(initialProfessors);
	}, [initialProfessors]);




	const handleModalSearchInputChange = (query: string) => {
		setFilteredProfessors(professors
			?.filter((prof) =>
				prof?.firstName!.toLowerCase()!.includes(query.toLowerCase()) ||
				prof?.lastName!.toLowerCase()!.includes(query.toLowerCase())
			)
		)
	}

	const handleAddMembers = async () => {
		const members = selectedProfessors.map((prof) => prof.id);
		await addMembers(members)
			.then(() => setSelectedProfessors([]))
			.catch((error) => console.error(error));
			// TODO - add toast

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
									setSelectedProfessors([...selectedProfessors, ...value.map((user) => JSON.parse(user))])
								}
							}}
						>
							{filteredProfessors?.map((prof) => (
								<ToggleGroupItem
									variant="outline"
									className="w-full h-full"
									key={prof.id}
									value={JSON.stringify(prof!)}
									aria-label={`Toggle ${prof.id}`}
								>
									<div className="w-full flex items-center py-3">
										<Avatar className="size-9">
											<AvatarImage src="/avatars/04.png" alt="Avatar" />
											<AvatarFallback>
												{prof.firstName.charAt(0).toUpperCase()}{prof.lastName.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm text-start font-medium leading-none">{prof.firstName} {prof.lastName}</p>
											<p className="text-xs text-start text-muted-foreground">
												{prof.email}
											</p>
										</div>
									</div>
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											selectedProfessors?.some(u => u.id === prof.id) ? "opacity-100" : "opacity-0"
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
							<Button size="sm" variant="outline" type="button" onClick={() => setSelectedProfessors([])}>Fermer</Button>
							<Button size="sm" type="button" className="dark:bg-secondary flex gap-x-1 dark:text-white" onClick={handleAddMembers}>
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