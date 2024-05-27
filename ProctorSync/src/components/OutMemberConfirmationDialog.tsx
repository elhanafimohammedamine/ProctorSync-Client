import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";


interface Props {
	isOpen: boolean;
	toggleOpen: () => void;
}
export default function OutMemberConfirmationDialog({isOpen, toggleOpen}: Props) {

	return(
		<AlertDialog open={isOpen} onOpenChange={toggleOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
					<AlertDialogDescription>
						Il s'agit d'une décision définitive. En confirmant cette action, le membre sera
						définitivement supprimée de cet groupe.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="space-x-2">
					<AlertDialogCancel>Annuler</AlertDialogCancel>
					<AlertDialogAction className="bg-destructive hover:bg-red-600 ml-0 md:ml-2">Confirmer</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}