import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";


import ClassroomCard from "@/components/ClassroomCard.tsx";
import CreateRoomDialog from "@/components/CreateRoomDialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useClassroom} from "@/hooks/use-classroom.ts";
import {Loader} from "@/components/Loader.tsx";

export default function ClassroomsPage() {

    const [isOpen, setOpen] = useState(false);
    const toggleDialog = () => setOpen(!isOpen)


    const {classrooms, classroomsAreLoading} = useClassroom();

    if (classroomsAreLoading) return <Loader />;

    return(
        <Card className="bg-transparent border-0 shadow-none">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <CardHeader className="px-4 md:px-6">
                    <CardTitle className="text-2xl md:text-3xl">Gérer les salles</CardTitle>
                    <CardDescription className="text-sm md:text-lg">Suivre et gérer tous les salles sur la
                        plateforme</CardDescription>
                </CardHeader>
                <div className="px-4 md:px-6 w-full md:w-fit">
                    <Button onClick={toggleDialog} className="w-full md:w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth={1.5}
                             stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        <span>Ajouter Salle</span>
                    </Button>
                </div>
                <CreateRoomDialog isOpen={isOpen} toggleOpen={toggleDialog}/>
            </div>
            <CardContent className="p-4 md:p-6 space-y-6 md:space-y-12">
            <div className="relative flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                </div>
                <div className="flex flex-col gap-y-6 md:gap-y-12">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                        {classrooms?.map((classroom) => (<ClassroomCard classroom={classroom} key={classroom?.id} />))}
                    </div>
                    {classrooms?.length === 0 && (
                        <div
                            className="min-h-96 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h3 className=" text-muted-foreground font-light italic tracking-tight">
                                    Aucune salle pour le moment
                                </h3>
                            </div>
                        </div>
                    )}
                </div>

            </CardContent>
        </Card>
    )
}