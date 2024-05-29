import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
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
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {classroomSchema} from "@/zod/schemas/classroom-schema.ts";
import {useClassroom} from "@/hooks/use-classroom.ts";

export default function CreateRoomFrom() {
    const blocs : string[] = ["Bloc A", "Bloc B", "Amphi"];
    const createRoomForm = useForm<z.infer<typeof classroomSchema>>({
        resolver: zodResolver(classroomSchema),
    })
    const {createClassroom} = useClassroom();
    async function onSubmit(values: z.infer<typeof classroomSchema>) {

        await createClassroom({
            roomName: values.roomName,
            bloc: values.blocName,
            capacity: values.capacity

        })
            .then()
            .catch();

        // TODO: Add a toast to show the success message
    }
    return(
        <Form {... createRoomForm}>
            <form onSubmit={createRoomForm.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-y-4">
                    <FormField
                        control={createRoomForm.control}
                        name="roomName"
                        render={({field}) => (
                            <FormItem className="md:col-start-1">
                                <FormLabel>Nom de la salle</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createRoomForm.control}
                        name="capacity"
                        render={({field}) => (
                            <FormItem className="md:col-start-1">
                                <FormLabel>Capacité de la salle</FormLabel>
                                <FormControl>
                                    <Input min={1} type="number" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createRoomForm.control}
                        name="blocName"
                        render={() => (
                            <FormItem>
                                <FormLabel>Bloc</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value : string) => createRoomForm.setValue("blocName",value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Bloc"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Bloc</SelectLabel>
                                                {blocs.map((bloc, index) => (
                                                    <SelectItem value={bloc} key={index}>{bloc}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <Button className="space-x-2  w-full md:w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        <span>Créer</span>
                    </Button>
                </div>
            </form>
        </Form>
    )
}