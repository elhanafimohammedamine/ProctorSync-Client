import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {useGroup} from "@/hooks/use-group.ts";
import {toast} from "@/components/ui/use-toast.ts";

interface Props {
    isOpen: boolean;
    toggleOpen: () => void;
    groupId: string;
}
export default function DeleteGroupConfirmationDialog({isOpen, toggleOpen, groupId} : Props) {

    const {deleteGroup} = useGroup()

    const handleGroupDeletion = async () => {
        await deleteGroup(groupId).then((response) => {
            toast({
                description: response.toString()
            })
        })
        toggleOpen()
    }

    return(
        <AlertDialog open={isOpen} onOpenChange={toggleOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr de supprimer cette salle?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Il s'agit d'une décision définitive. En confirmant cette action, le groupe sera
                        définitivement supprimée de la base de données.
                        de la base de données.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="space-x-2">
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleGroupDeletion}
                        className="bg-destructive hover:bg-red-600 ml-0 md:ml-2"
                    >Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>    )
}