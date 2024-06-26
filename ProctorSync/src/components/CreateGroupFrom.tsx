import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {groupFormSchema} from "@/zod/schemas/group-schema.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useGroup} from "@/hooks/use-group.ts";
import {toast} from "@/components/ui/use-toast.ts";

interface Props {
    onClose: () => void;
}

export default function CreateGroupFrom({onClose}: Props) {
    const {createGroup} = useGroup();

    const createGroupForm = useForm<z.infer<typeof groupFormSchema>>({
        resolver: zodResolver(groupFormSchema),
    })

    async function onSubmit(values: z.infer<typeof groupFormSchema>) {
        await createGroup({
            groupName: values.groupName,
            description: values.description as string,
        })
            .then(response => {
                onClose()
                toast({
                    description: response
                })
            })
            .catch();

    }
    return(
        <Form {... createGroupForm}>
            <form onSubmit={createGroupForm.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-y-4">
                    <FormField
                        control={createGroupForm.control}
                        name="groupName"
                        render={({field}) => (
                            <FormItem className="md:col-start-1">
                                <FormLabel>Nom de groupe</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createGroupForm.control}
                        name="description"
                        render={({field}) => (
                            <FormItem className="md:col-start-1">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="description de groupe" className="resize-none"{...field}/>
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