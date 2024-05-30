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
import {IClassroomResponse} from "@/types/types.ts";
import {buttonStyle} from "@/assets/style/CustomStyles.ts";

interface SelectRoomDialogProps {
	trigger: ReactNode,
	handleAddRooms: (Classrooms : IClassroomResponse[]) => void;
}

export default function SelectRoomDialog({trigger, handleAddRooms} : SelectRoomDialogProps) {
	const [selectedRooms, setSelectedRooms] = useState<IClassroomResponse[]>([]);
	// @ts-ignore
	const handleModalSearchInputChange = (query: string) => {

	}

	const rooms = [
		{
			id: "dsgsdgsfd",
			name: "Salle 14",
			bloc: "Bloc 1",
			capacity: 12,
		},
		{
			id: "dsgsdgfgdfgdfgsfd",
			name: "Salle 15",
			bloc: "Bloc 1",
			capacity: 12,
		},
		{
			id: "dsgsfdgdgdgfdgsfd",
			name: "Salle 16",
			bloc: "Bloc 1",
			capacity: 12,
		}
	]
	return (
		<Dialog>
			<DialogTrigger asChild className={cn(buttonStyle, "flex justify-end")}>
				{trigger}
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Sélectionner une Salle</DialogTitle>
					<DialogDescription>
						Vous pouvez chercher une salle par son nom
					</DialogDescription>
				</DialogHeader>
				<Search placeholder="Recherche salle..." onChange={handleModalSearchInputChange} />
				<div >
					<ScrollArea className="max-h-[400px]">
						<ToggleGroup
							className="w-full block space-y-2" type="multiple"
							onValueChange={(value) => {
								if(value) {
									setSelectedRooms([...value.map(room => JSON.parse(room))]);
								}
							}}
						>
							{rooms?.map((room) => (
								<ToggleGroupItem
									variant="outline"
									className="w-full h-full"
									key={room.id}
									value={JSON.stringify(room)}
									aria-label={`Toggle ${room.id}`}
								>
									<div className="w-full flex items-center py-3">
										<Avatar className="size-9">
											<AvatarImage src="/avatars/04.png" alt="Avatar" />
											<AvatarFallback>
												{room.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div className="ml-4 space-y-1">
											<p className="text-sm text-start font-medium leading-none">{room.name}</p>
											<p className="text-xs text-start text-muted-foreground">Bloc : {room.bloc}</p>
											<p className="text-xs text-start text-muted-foreground">Capacité : {room.capacity}</p>
										</div>
									</div>
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											selectedRooms?.some(u => u.id === room.id) ? "opacity-100" : "opacity-0"
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
							<Button size="sm" variant="outline" type="button" onClick={() => setSelectedRooms([])}>Fermer</Button>
							<Button size="sm"  className=" flex gap-x-1 dark:text-white" onClick={() => handleAddRooms(selectedRooms)}>
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