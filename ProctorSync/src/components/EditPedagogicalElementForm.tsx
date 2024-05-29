import {
	pedagogicalElementSchema,
	PedagogicalElementSchema
} from "@/zod/schemas/new-pedagogical-element-schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {useLevel} from "@/hooks/use-level.ts";
import {useElementType} from "@/hooks/use-element-type.ts";
import {useProfessor} from "@/hooks/use-professor.ts";
import {usePedagogicElement} from "@/hooks/use-pedagogic-element.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {IPedagogicElementResponse} from "@/types/types.ts";
import {Pencil} from "lucide-react";


interface Props {
	pedagogicalElement: IPedagogicElementResponse
}

export default function EditPedagogicalElementForm({pedagogicalElement}: Props) {
	const { toast } = useToast()

	const {updatePedagogicElement} =  usePedagogicElement(pedagogicalElement?.id)

	const editPedagogicalElementForm
		= useForm<PedagogicalElementSchema>({
			resolver: zodResolver(pedagogicalElementSchema),
			defaultValues: {
				elementTitle: pedagogicalElement?.elementTitle,
				elementTypeId: pedagogicalElement?.elementType?.id,
				levelId: pedagogicalElement?.level?.id,
				professorId: pedagogicalElement?.professor?.id,
				coordinatorId: pedagogicalElement?.coordinator?.id
			}
		})

	const onSubmit = async (data: PedagogicalElementSchema) => {

		await updatePedagogicElement({
			id: pedagogicalElement?.id,
			elementTitle: data?.elementTitle,
			elementTypeId: data?.elementTypeId,
			levelId: data?.levelId,
			professorId: data?.professorId,
			coordinatorId: data?.coordinatorId

		})
			.then((response) => {
				toast({
					description: response
				})
			})
			.catch()


	}



	const {levels} = useLevel();
	const {elementTypes} = useElementType();
	const {professors} = useProfessor()


		return <div>
			<Form {...editPedagogicalElementForm}>
				<form onSubmit={editPedagogicalElementForm.handleSubmit(onSubmit)}>
					<div className="grid gap-y-5">
						<FormField
							control={editPedagogicalElementForm.control}
							name="elementTitle"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Titre</FormLabel>
									<FormControl>
										<Input className="bg-muted/10" type="text"  {...field}/>
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
						<div className="grid md:grid-cols-2 gap-5">
							<FormField
								control={editPedagogicalElementForm.control}
								name="elementTypeId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type d'élement</FormLabel>
										<FormControl>
											<Select
												{...field}
												onValueChange={(value) => editPedagogicalElementForm.setValue("elementTypeId", value)}
											>
												<SelectTrigger className={cn(
													field.value || "text-muted-foreground", "bg-muted/10"

												)}>
													<SelectValue  placeholder="Type"></SelectValue>
												</SelectTrigger>
												<SelectContent>
													{elementTypes?.map((type) => (<SelectItem  key={type?.id} value={type?.id}>{type?.typeTitle}</SelectItem>))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={editPedagogicalElementForm.control}
								name="levelId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Niveau</FormLabel>
										<FormControl>
											<Select
												{...field}
												onValueChange={(value) => editPedagogicalElementForm.setValue("levelId", value)}
											>
												<SelectTrigger className={cn(
													field.value || "text-muted-foreground", "bg-muted/10"

												)}>
													<SelectValue  placeholder="Niveau"></SelectValue>
												</SelectTrigger>
												<SelectContent>
													{levels?.map((level) => (<SelectItem key={level?.id} value={level?.id}>{level?.levelTitle}</SelectItem>))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={editPedagogicalElementForm.control}
							name="professorId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Enseignant</FormLabel>
									<FormControl>
										<Select
											{...field}
											onValueChange={(value) => editPedagogicalElementForm.setValue("professorId", value)}
										>
											<SelectTrigger className={cn(
												field.value || "text-muted-foreground", "bg-muted/10"

											)}>
												<SelectValue  placeholder="Sélectionner un enseignant"></SelectValue>
											</SelectTrigger>
											<SelectContent>
												{professors?.map((professor) => (<SelectItem key={professor?.id} value={professor?.id}>{professor?.firstName} {professor?.lastName}</SelectItem>))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={editPedagogicalElementForm.control}
							name="coordinatorId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Coordinateur</FormLabel>
									<FormControl>
										<Select
											{...field}
											onValueChange={(value) => editPedagogicalElementForm.setValue("coordinatorId", value)}
										>
											<SelectTrigger className={cn(
												field.value || "text-muted-foreground", "bg-muted/10"

											)}>
												<SelectValue  placeholder="Sélectionner un coordinateur"></SelectValue>
											</SelectTrigger>
											<SelectContent>
												{professors?.map((professor) => (<SelectItem key={professor?.id} value={professor?.id}>{professor?.firstName} {professor?.lastName}</SelectItem>))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid justify-end">
							<Button size="sm" type="submit"  className="flex items-center gap-x-1.5">
								<Pencil className="h-4 w-4"/>
								Modifier
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
}