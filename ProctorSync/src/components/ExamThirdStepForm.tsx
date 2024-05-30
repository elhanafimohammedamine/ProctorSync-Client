import {useFieldArray, UseFormReturn} from "react-hook-form";
import {StepThreeExamForm} from "@/zod/schemas/exam-schema.ts";
import SelectRoomDialog from "@/components/SelectRoomDialog.tsx";
import {useEffect, useState} from "react";
import {IClassroomResponse} from "@/types/types.ts";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";

interface ThirdStepProps {
    form: UseFormReturn<StepThreeExamForm>
}
export default function ExamThirdStepForm({form} : ThirdStepProps) {

    const [selectedRooms, setSelectedRooms] = useState<IClassroomResponse[]>([]);
    // @ts-ignore
    const { fields: roomIds, append: appendRoomIds, remove: removeRoomIds } = useFieldArray({
        name: "roomIds",
        control: form.control
    })

    const handleAddRooms = (classrooms : IClassroomResponse[]) => {
        setSelectedRooms([...classrooms]);

    }
    const handleRemoveRoom = (index : number) => {
        // @ts-ignore
        const updatedSelectedRooms = selectedRooms.filter((room, i) => i !== index);
        setSelectedRooms(updatedSelectedRooms);
        removeRoomIds(index)
    }

    useEffect(() => {
        form.setValue("roomIds", [])
        selectedRooms.forEach((room) => {
            appendRoomIds({ roomId: room.id });
        });
    }, [selectedRooms]);
    return (
        <div className="space-y-6 py-6 md:py-12">
            <div className="flex justify-end">
                <SelectRoomDialog handleAddRooms={handleAddRooms} trigger={
                    <div className="w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        <span>Ajouter Salle</span>
                    </div>}/>
            </div>
            <ul role="list" className="space-y-2">
                {selectedRooms.map((room, index) => (
                    <li key={room.id}
                        className="flex justify-between items-center bg-card rounded-xl px-6 gap-x-6 py-3">
                        <div className="flex justify-center items-center min-w-0 gap-x-4">
                            <Avatar className="rounded-lg">
                                <AvatarFallback
                                    className="rounded-lg bg-gray-200 dark:bg-muted-foreground/15 font-medium">CN</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 ">{room.name}</p>
                                <p className="truncate text-xs leading-5 text-muted-foreground">Bloc : {room.bloc}</p>
                                <p className="truncate text-xs leading-5 text-muted-foreground">Capacité : {room.capacity}</p>
                            </div>
                        </div>
                        <div className="flex items-center flex-row space-x-5">
                            <div className="shrink-0 flex flex-col items-end">
                                <Button size="icon" variant="ghost" className="space-x-2" onClick={() => handleRemoveRoom(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                         className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
                {selectedRooms.length === 0 && (
                    <p className="text-sm py-10 text-muted-foreground italic text-center font-light">Aucune salle</p>)}
            </ul>
        </div>

    )
}