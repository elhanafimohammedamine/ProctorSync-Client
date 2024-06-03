import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";


import { IAdministratorResponse } from "@/types/types";
import { AdministartorSchema, administratorSchema } from "@/zod/schemas/administrator-schema";
import { Save } from "lucide-react";
import { useAdministrator } from "@/hooks/use-administrator";
import { toast } from "./ui/use-toast";



interface Props {
    administrator: IAdministratorResponse;
    toggleDialog: () => void;
}


export default function UpdateAdministratorForm({ administrator , toggleDialog}: Props) {


    const updateAdminForm = useForm<AdministartorSchema>({
        resolver: zodResolver(administratorSchema),
        defaultValues: {
            ...administrator
        }

    })

    const { updateAdministrator } = useAdministrator(administrator?.id);


    const onSubmit = async (data: AdministartorSchema) => {
        await updateAdministrator({
            id: administrator?.id,
            ...data
        })
            .then(response => {
                toast({
                    description: response,
                })
        })
    }




    return <div>
        <Form {...updateAdminForm}>
            <form onSubmit={updateAdminForm.handleSubmit(onSubmit)}>
                <div className="grid gap-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                            control={updateAdminForm.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input className="bg-muted/10" type="text"  {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs font-medium" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={updateAdminForm.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input className="bg-muted/10" type="text"  {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs font-medium" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={updateAdminForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse email</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 absolute right-3 top-1/2 -translate-y-1/2">
                                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                        </svg>
                                        <Input className="bg-muted/10" type="text"  {...field} />
                                    </div>

                                </FormControl>
                                <FormMessage className="text-xs font-medium" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={updateAdminForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Téléphone</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 absolute right-3 top-1/2 -translate-y-1/2">
                                            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                        </svg>
                                        <Input className="bg-muted/10" type="text"  {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs font-medium" />
                            </FormItem>
                        )}
                    />

                    <div className="grid justify-end">
                        <Button type="submit" className="flex items-center gap-x-2" onClick={toggleDialog}>
                            <Save className="size-4" />
                            Sauvgarder
                        </Button>
                    </div>
                </div>

            </form>
        </Form>
    </div>


}