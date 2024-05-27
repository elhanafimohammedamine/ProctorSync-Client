import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import CreateRoomFrom from "@/components/CreateRoomFrom.tsx";
interface DialogProps {
    isOpen: boolean;
    toggleOpen: () => void;
}
export default function CreateRoomDialog({isOpen, toggleOpen}: DialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={toggleOpen}>
            <DialogContent className="max-h-screen max-w-xl">
                <DialogHeader>
                    <DialogTitle>Créer une salle</DialogTitle>
                    <DialogDescription>
                        Ajouter les informations nécessaires ici. Cliquez sur Créer lorsque vous avez
                        terminé.
                    </DialogDescription>
                </DialogHeader>
                <CreateRoomFrom/>
            </DialogContent>
        </Dialog>
    )
}