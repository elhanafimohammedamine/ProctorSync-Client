

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



	return <AlertDialog open={isOpen} onOpenChange={toggleOpen}>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
				<AlertDialogDescription>
					Your account cannot be restored. This will permanently delete the your account.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					className="bg-destructive hover:bg-red-700 text-white dark:bg-red-600">Continue</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
}