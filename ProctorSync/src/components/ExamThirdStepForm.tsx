import {useFieldArray, UseFormReturn} from "react-hook-form";
import {StepThreeExamForm} from "@/zod/schemas/exam-schema.ts";
import SelectRoomDialog from "@/components/SelectRoomDialog.tsx";
import {useEffect, useState} from "react";
import {IClassroomResponse} from "@/types/types.ts";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {useGroup} from "@/hooks/use-group.ts";

interface ThirdStepProps {
    form: UseFormReturn<StepThreeExamForm>
    startDateTime: string,
    endDateTime: string,

}
export default function ExamThirdStepForm({form, startDateTime, endDateTime} : ThirdStepProps) {

    const [selectedRooms, setSelectedRooms] = useState<(IClassroomResponse & { count: number, groupId: string | null })[]>([]);
    // @ts-ignore
    const { fields: roomIds, append: appendRoomIds, remove: removeRoomIds } = useFieldArray({
        name: "roomIds",
        control: form.control
    })

    const {groups} = useGroup()

    const handleAddRooms = (classrooms: IClassroomResponse[]) => {
        const newClassrooms = classrooms.map(room => ({ ...room, count: 2, groupId: null}));
        setSelectedRooms([...newClassrooms]);
    };

    const handleIncrement = (index: number) => {
        const updatedRooms = [...selectedRooms];
        updatedRooms[index].count += 1;
        setSelectedRooms(updatedRooms);
    };

    const handleDecrement = (index: number) => {
        const updatedRooms = [...selectedRooms];
        updatedRooms[index].count = Math.max(2, updatedRooms[index].count - 1); // Prevent negative count
        setSelectedRooms(updatedRooms);
    };
    const handleRemoveRoom = (index : number) => {
        // @ts-ignore
        const updatedSelectedRooms = selectedRooms.filter((room, i) => i !== index);
        setSelectedRooms(updatedSelectedRooms);
        removeRoomIds(index)
    }

    const handleGroupSelect = (index: number, value: string) => {
        const updatedRooms = [...selectedRooms];
        updatedRooms[index].groupId = value;
        setSelectedRooms(updatedRooms);
    }

    console.log(form.formState.errors)

    useEffect(() => {
        // @ts-ignore
        form.setValue("roomIds", []);
        selectedRooms.forEach((room) => {
            appendRoomIds({ roomId: room.id, monitorsCount: room.count, groupId: room.groupId! });
        });
    }, [selectedRooms]);
    return (
        <div className="space-y-6 py-6 md:py-8 lg:py-12">
            <div className="flex justify-end">
                <SelectRoomDialog startDateTime={startDateTime} endDateTime={endDateTime}  handleAddRooms={handleAddRooms} trigger={
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
                        className="flex justify-between items-center bg-card rounded-xl px-3 md:px-6 gap-x-2 md:gap-x-6 py-3">
                        <div className="flex justify-center items-center min-w-0 gap-x-4">
                            <Avatar className="rounded-lg md:min-h-12 md:min-w-12">
                                <AvatarFallback
                                    className="rounded-lg bg-gray-200 dark:bg-muted-foreground/15 font-medium">{room.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-auto">
                                <p className="text-lg font-semibold leading-6 ">{room.name}</p>
                                <p className="truncate text-xs leading-5 text-muted-foreground">Bloc : {room.bloc}</p>
                                <p className="truncate text-xs leading-5 text-muted-foreground">Capacité
                                    : {room.capacity}</p>
                                <p className="truncate text-xs leading-5 text-muted-foreground">Nombre de Surveillants
                                    : {room.count}</p>
                            </div>
                        </div>
                        <div className="flex items-center flex-row gap-x-5">
                            <Select onValueChange={(value: string) => handleGroupSelect(index, value)}>
                                <SelectTrigger className="bg-transparent">
                                    <SelectValue placeholder="Groupe"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Groupe</SelectLabel>
                                        {groups?.map((element) => (
                                            <SelectItem key={element?.id}
                                                        value={element?.id}>{element?.groupName}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="relative flex items-center">
                                <Button type="button" onClick={() => handleDecrement(index)}
                                        className="text-muted-foreground bg-transparent hover:bg-muted-foreground/20 h-6 w-6 p-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="size-4">
                                        <path fillRule="evenodd"
                                              d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </Button>
                                <Input type="text" value={room.count} readOnly
                                       className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                                       placeholder="" required
                                />
                                <Button type="button" onClick={() => handleIncrement(index)}
                                        className="text-muted-foreground bg-transparent hover:bg-muted-foreground/20 h-6 w-6 p-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="size-4">
                                        <path fillRule="evenodd"
                                              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </Button>
                            </div>
                            <div className="shrink-0 flex flex-col items-end">
                                <Button size="icon" variant="ghost" className="space-x-2"
                                        onClick={() => handleRemoveRoom(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                         className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
                {selectedRooms.length === 0 && (
                    <div className="flex flex-col justify-center items-center gap-y-2 text-sm py-10t">
                        <span className="text-muted-foreground italic text-center font-ligh">Aucune salle</span>
                        <span className="text-destructive">{form.formState.errors.roomIds && form.formState.errors.roomIds.message}</span>
                    </div>)}
            </ul>
        </div>

    )
}