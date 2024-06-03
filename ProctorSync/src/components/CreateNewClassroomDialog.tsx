import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import CreateRoomFrom from "@/components/CreateRoomFrom.tsx";
import { useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { buttonStyle } from "@/assets/style/CustomStyles";



export default function CreateNewClassroomDialog() {
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeDialog = () => setIsDialogOpen(false);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
            <div className={cn("px-4 md:px-6 w-full md:w-fit")}>
                    <div  className={cn("w-full md:w-fit", buttonStyle)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        <span>Ajouter Salle</span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-h-screen max-w-xl">
                <DialogHeader>
                    <DialogTitle>Créer une salle</DialogTitle>
                    <DialogDescription>
                        Ajouter les informations nécessaires ici. Cliquez sur Créer lorsque vous avez
                        terminé.
                    </DialogDescription>
                </DialogHeader>
                <CreateRoomFrom onClose={closeDialog} />
            </DialogContent>
        </Dialog>
    )
}