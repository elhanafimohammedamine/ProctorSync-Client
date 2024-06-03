import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";
import CreateGroupFrom from "@/components/CreateGroupFrom.tsx";
import { cn } from "@/lib/utils";
import { buttonStyle } from "@/assets/style/CustomStyles";
import { useState } from "react";

export default function CreateNewGroupDialog() {


    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeDialog = () => setIsDialogOpen(false);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
                <span className={cn(buttonStyle)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Ajouter Groupe</span>
                </span>
            </DialogTrigger>
            <DialogContent className="max-h-screen max-w-xl">
                <DialogHeader>
                    <DialogTitle>Créer un Groupe</DialogTitle>
                    <DialogDescription>
                        Ajouter les informations nécessaires ici. Cliquez sur Créer lorsque vous avez
                        terminé.
                    </DialogDescription>
                </DialogHeader>
                <CreateGroupFrom onClose={closeDialog} />
            </DialogContent>
        </Dialog>
    )
}