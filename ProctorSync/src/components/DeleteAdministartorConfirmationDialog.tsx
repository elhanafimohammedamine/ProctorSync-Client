import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import { useAdministrator } from "@/hooks/use-administrator";
import { toast } from "./ui/use-toast";


interface Props {
    isOpen: boolean;
    toggleOpen: () => void;
    administratorId: string;
}
export default function DeleteAdministartorConfirmationDialog({isOpen, toggleOpen, administratorId} : Props) {

    const { deleteAdministrator } = useAdministrator();

    const handleAdministratorDeletion = async () => {
        await deleteAdministrator(administratorId).then(res => {
            toast({
                description: res
            })
        });
        
        toggleOpen()
    }

    return(
        <AlertDialog open={isOpen} onOpenChange={toggleOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr de supprimer cet administrator?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Il s'agit d'une décision définitive. En confirmant cette action, l'administrator sera
                        définitivement supprimée de la base de données.
                        de la base de données.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="space-x-2">
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleAdministratorDeletion}
                        className="bg-destructive hover:bg-red-600 ml-0 md:ml-2"
                    >Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>    )
}