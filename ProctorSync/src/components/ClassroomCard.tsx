import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Building2, SquarePen, Trash2, UsersRound} from "lucide-react";
import EditRoomDialog from "@/components/EditRoomDialog.tsx";
import DeleteEntityDialog from "@/components/DeleteEntityDialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import ClassIcon from "@/assets/images/class1.svg"
import {IClassroomResponse} from "@/types/types.ts";


interface IClassroomCardProps {
	classroom: IClassroomResponse;
}


export default function ClassroomCard({classroom}: IClassroomCardProps) {
	const [isDeleteOpen, setDeleteOpen] = useState(false);
	const [isEditOpen, setEditOpen] = useState(false);
	const toggleDeleteDialog = () => setDeleteOpen(!isDeleteOpen)
	const toggleEditDialog = () => setEditOpen(!isEditOpen)


	return <Card className="rounded-xl bg-card">
		<CardHeader className="p-0">
			<div className="h-44 flex justify-center items-center bg-blue-400 rounded-t-xl">
				<img className="h-28 w-28 object-cover" src={ClassIcon} alt="icon"/>
			</div>
		</CardHeader>
		<CardContent>
			<div className="pt-4">
				<h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
					{classroom?.name}
				</h3>
				<div className="flex items-center gap-x-5 mt-3">
					<div className="flex items-center gap-x-2">
						<UsersRound className="size-4 text-primary" />
						<span className="text-xs font-medium text-muted-foreground">{classroom?.capacity} sièges</span>
					</div>
					<div className="flex items-center gap-x-2">
						<Building2 className="size-4 text-primary" />
						<span className="text-xs font-medium text-muted-foreground">{classroom?.bloc}</span>
					</div>
				</div>
			</div>
		</CardContent>
		<CardFooter className="p-0 mt-auto flex border-t text-primary border-border divide-x divide-gray-200 dark:divide-border">
			<Button onClick={toggleEditDialog} className="w-full text-primary dark:text-primary py-3 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-medium rounded-es-xl  shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none bg-card border-border dark:hover:bg-muted/20">
				<SquarePen className="size-4 "/>
				Modifier
			</Button>
			<Button onClick={toggleDeleteDialog} className="w-full text-red-600 dark:text-red-600 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-medium rounded-none rounded-ee-xl  shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none bg-card border-border dark:hover:bg-muted/20">
				<Trash2 className="size-4"/>
				Supprimer
			</Button>
			<EditRoomDialog isOpen={isEditOpen} toggleOpen={toggleEditDialog}/>
			<DeleteEntityDialog entityName="salle" isOpen={isDeleteOpen} toggleOpen={toggleDeleteDialog}/>
		</CardFooter>
	</Card>
}