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
import {roomFormSchema} from "@/zod/schemas/room-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export default function CreateRoomFrom() {
    const blocs : string[] = [
        "Bloc A", "Bloc B", "Amphi"
    ];
    const editRoomForm = useForm<z.infer<typeof roomFormSchema>>({
        resolver: zodResolver(roomFormSchema),
    })
    function onSubmit(values: z.infer<typeof roomFormSchema>) {
        console.log(values);
    }
    return(
        <Form {... editRoomForm}>
            <form onSubmit={editRoomForm.handleSubmit(onSubmit)} className="space-y-6">
                <div className="p-4 grid gap-y-4">
                    <FormField
                        control={editRoomForm.control}
                        name="roomName"
                        render={({field}) => (
                            <FormItem className="md:col-start-1">
                                <FormLabel>Nom de la salle</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={editRoomForm.control}
                        name="capacity"
                        render={({field}) => (
                            <FormItem className="md:col-start-1">
                                <FormLabel>Capacité de la salle</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={editRoomForm.control}
                        name="blocName"
                        render={() => (
                            <FormItem>
                                <FormLabel>Bloc</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value : string) => editRoomForm.setValue("blocName",value)}>
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
                                <FormMessage/>
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