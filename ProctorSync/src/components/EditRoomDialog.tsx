import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import EditRoomFrom from "@/components/EditRoomFrom.tsx";
interface EditDialogProps {
    isOpen: boolean;
    toggleOpen: () => void;
}
export default function EditRoomDialog({isOpen, toggleOpen}: EditDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={toggleOpen}>
            <DialogContent className="max-h-screen max-w-xl">
                <DialogHeader>
                    <DialogTitle>Modifier la salle</DialogTitle>
                    <DialogDescription>
                        Modifier les informations nécessaires ici. Cliquez sur sauvegarder lorsque vous avez terminé.
                    </DialogDescription>
                </DialogHeader>
                <EditRoomFrom/>
            </DialogContent>
        </Dialog>
    )
}