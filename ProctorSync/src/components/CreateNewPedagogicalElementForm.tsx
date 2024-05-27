import {
	newPedagogicalElementSchema,
	NewPedagogicalElementSchema
} from "@/zod/schemas/new-pedagogical-element-schema.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";


export default function CreateNewPedagogicalElementForm() {


	const newPedagogicalElementForm
		= useForm<NewPedagogicalElementSchema>({
			resolver: zodResolver(newPedagogicalElementSchema),

		})

	const onSubmit = (data: NewPedagogicalElementSchema) => {
		console.log(data)
	}



		return <div>
			<Form {...newPedagogicalElementForm}>
				<form onSubmit={newPedagogicalElementForm.handleSubmit(onSubmit)}>
					<div className="grid gap-y-5">
						<FormField
							control={newPedagogicalElementForm.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Titre</FormLabel>
									<FormControl>
										<Input className="bg-muted/10" type="text"  {...field}/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={newPedagogicalElementForm.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type d'élement</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) => newPedagogicalElementForm.setValue("type", value as "module" | "element")}
										>
											<SelectTrigger className={cn(
												field.value || "text-muted-foreground", "bg-muted/10"

											)}>
												<SelectValue  placeholder="Type"></SelectValue>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="module">Module</SelectItem>
												<SelectItem value="element">Élement de module</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={newPedagogicalElementForm.control}
							name="levelId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Niveau</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) => newPedagogicalElementForm.setValue("levelId", value)}
										>
											<SelectTrigger className={cn(
												field.value || "text-muted-foreground", "bg-muted/10"

											)}>
												<SelectValue  placeholder="Niveau"></SelectValue>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="gi1">Génie Informatique 1</SelectItem>
												<SelectItem value="gi2">Génie Informatique 2</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={newPedagogicalElementForm.control}
							name="professorId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Enseignant</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) => newPedagogicalElementForm.setValue("professorId", value)}
										>
											<SelectTrigger className={cn(
												field.value || "text-muted-foreground", "bg-muted/10"

											)}>
												<SelectValue  placeholder="Sélectionner un enseignant"></SelectValue>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="hsd54d84d-fjnf5s5-d8jb">Mohammed Amine El hanafi</SelectItem>
												<SelectItem value="hsd54d84fd-fjnf5s5-djb">Abdessamad Abidar</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={newPedagogicalElementForm.control}
							name="coordinatorId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Coordinateur</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) => newPedagogicalElementForm.setValue("coordinatorId", value)}
										>
											<SelectTrigger className={cn(
												field.value || "text-muted-foreground", "bg-muted/10"

											)}>
												<SelectValue  placeholder="Sélectionner un coordinateur"></SelectValue>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="hsd54d84d-fjnf5s5-d8jb">Mohammed Amine El hanafi</SelectItem>
												<SelectItem value="hsd54d84fd-fjnf5s5-djb">Abdessamad Abidar</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid justify-end">
							<Button size="sm" type="submit"  className="flex items-center gap-x-1.5">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
								</svg>
								Créer</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
}