import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";

interface DeleteDialogProps {
    entityName: string;
    isOpen: boolean;
    toggleOpen: () => void;
}
export default function DeleteEntityDialog({entityName, isOpen, toggleOpen} : DeleteDialogProps) {
    return(
        <AlertDialog open={isOpen} onOpenChange={toggleOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer {entityName} Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        Il s'agit d'une décision définitive. En confirmant cette action, {entityName} sera
                        définitivement supprimée de la base de données.
                        de la base de données.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="space-x-2">
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive hover:bg-red-600 ml-0 md:ml-2">Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>    )
}