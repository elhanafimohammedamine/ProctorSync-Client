import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog.tsx";
import CreateNewPedagogicalElementForm from "@/components/CreateNewPedagogicalElementForm.tsx";
import {buttonStyle} from "@/assets/style/CustomStyles.ts";
import {cn} from "@/lib/utils.ts";
import { useState } from "react";


export default function CreateNewPedagogicalElementDialog() {


	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const closeDialog = () => setIsDialogOpen(false);
	
	return  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
		<DialogTrigger className={cn(buttonStyle)}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
			</svg>
			<span>Ajouter un élement</span>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="flex items-center gap-x-3">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
					</svg>
					Créer un élément pédagogique</DialogTitle>
				<DialogDescription>
					This action cannot be undone. This will permanently delete your account
					and remove your data from our servers.
				</DialogDescription>
			</DialogHeader>
			<CreateNewPedagogicalElementForm  onClose={closeDialog} />
		</DialogContent>

	</Dialog>
}