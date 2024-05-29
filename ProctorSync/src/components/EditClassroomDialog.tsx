import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import EditClassroomFrom from "@/components/EditClassroomFrom.tsx";
import {IClassroomResponse} from "@/types/types.ts";
interface EditDialogProps {
    isOpen: boolean;
    toggleOpen: () => void;
    classroom: IClassroomResponse;
}
export default function EditClassroomDialog({isOpen, toggleOpen, classroom}: EditDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={toggleOpen}>
            <DialogContent className="max-h-screen max-w-xl">
                <DialogHeader>
                    <DialogTitle>Modifier la salle</DialogTitle>
                    <DialogDescription>
                        Modifier les informations nécessaires ici. Cliquez sur sauvegarder lorsque vous avez terminé.
                    </DialogDescription>
                </DialogHeader>
                <EditClassroomFrom classroom={classroom}/>
            </DialogContent>
        </Dialog>
    )
}