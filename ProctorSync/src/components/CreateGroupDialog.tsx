import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import CreateGroupFrom from "@/components/CreateGroupFrom.tsx";
interface DialogProps {
    isOpen: boolean;
    toggleOpen: () => void;
}
export default function CreateGroupDialog({isOpen, toggleOpen}: DialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={toggleOpen}>
            <DialogContent className="max-h-screen max-w-xl">
                <DialogHeader>
                    <DialogTitle>Créer un Groupe</DialogTitle>
                    <DialogDescription>
                        Ajouter les informations nécessaires ici. Cliquez sur Créer lorsque vous avez
                        terminé.
                    </DialogDescription>
                </DialogHeader>
                <CreateGroupFrom toggleDialog={toggleOpen}/>
            </DialogContent>
        </Dialog>
    )
}