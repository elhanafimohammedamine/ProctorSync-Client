import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {useClassroom} from "@/hooks/use-classroom.ts";

interface Props {
    isOpen: boolean;
    toggleOpen: () => void;
    classroomId: string;
}
export default function DeleteClassroomConfirmationDialog({isOpen, toggleOpen, classroomId} : Props) {

    const {deleteClassroom} = useClassroom()

    const handleClassroomDeletion = async () => {
        await deleteClassroom(classroomId)
        toggleOpen()
    }

    return(
        <AlertDialog open={isOpen} onOpenChange={toggleOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr de supprimer cette salle?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Il s'agit d'une décision définitive. En confirmant cette action, la salle sera
                        définitivement supprimée de la base de données.
                        de la base de données.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="space-x-2">
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleClassroomDeletion}
                        className="bg-destructive hover:bg-red-600 ml-0 md:ml-2"
                    >Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>    )
}