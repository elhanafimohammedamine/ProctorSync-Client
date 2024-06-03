import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import { useProfessor } from "@/hooks/use-professor";

interface Props {
    isOpen: boolean;
    toggleOpen: () => void;
    professorId: string;
}
export default function DeleteProfessorConfirmationDialog({isOpen, toggleOpen, professorId} : Props) {

    const {deleteProfessor} = useProfessor()

    const handleProfesseurDeletion = async () => {
        await deleteProfessor(professorId)
        toggleOpen()
    }

    return(
        <AlertDialog open={isOpen} onOpenChange={toggleOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr de supprimer ce professeur?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Il s'agit d'une décision définitive. En confirmant cette action, le professeur sera
                        définitivement supprimée de la base de données.
                        de la base de données.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="space-x-2">
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleProfesseurDeletion}
                        className="bg-destructive hover:bg-red-600 ml-0 md:ml-2"
                    >Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>    )
}