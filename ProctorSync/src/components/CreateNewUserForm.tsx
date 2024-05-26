import {useForm} from "react-hook-form";
import {newUserSchema, NewUserSchema} from "@/zod/schemas/new-user-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {cn} from "@/lib/utils.ts";



export default function CreateNewUserForm() {


	const newUserForm = useForm<NewUserSchema>({
		resolver: zodResolver(newUserSchema),
		defaultValues: {
			role: "teacher"
		}
	})


	const onSubmit = (data: NewUserSchema) => {
		console.log(data)

	}



	return <div>
		<Form {...newUserForm}>
			<form onSubmit={newUserForm.handleSubmit(onSubmit)}>
				<div className="grid gap-y-5">
					<div className="grid md:grid-cols-2 gap-5">
						<FormField
							control={newUserForm.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Prénom</FormLabel>
									<FormControl>
										<Input className="bg-muted/10" type="text"  {...field}/>
									</FormControl>
									<FormMessage className="text-xs font-normal" />
								</FormItem>
							)}
						/>
						<FormField
							control={newUserForm.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom</FormLabel>
									<FormControl>
										<Input className="bg-muted/10" type="text"  {...field}/>
									</FormControl>
									<FormMessage className="text-xs font-normal" />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={newUserForm.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Adresse email</FormLabel>
								<FormControl>
									<Input className="bg-muted/10" type="text"  {...field}/>
								</FormControl>
								<FormMessage className="text-xs font-normal" />
							</FormItem>
						)}
					/>
					<FormField
						control={newUserForm.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Téléphone</FormLabel>
								<FormControl>
									<Input className="bg-muted/10" type="text"  {...field}/>
								</FormControl>
								<FormMessage className="text-xs font-normal" />
							</FormItem>
						)}
					/>
					<FormField
						control={newUserForm.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Profile du personnel</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => newUserForm.setValue("role", value as "administrator" | "teacher")}
									>
										<SelectTrigger className={cn(
											field.value || "text-muted-foreground", "bg-muted/10"

										)}>
											<SelectValue  placeholder="Type"></SelectValue>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="administrator">Administrateur</SelectItem>
											<SelectItem value="teacher">Enseignant</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage className="text-xs font-normal" />
							</FormItem>
						)}
					/>
					<div className="grid justify-end">
						<Button type="submit"  className="flex items-center gap-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
							Créer</Button>
					</div>
				</div>

			</form>
		</Form>
	</div>


}