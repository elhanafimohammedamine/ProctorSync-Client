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

interface Props {
	onClose: () => void;
}



export default function CreateNewPedagogicalElementForm({ onClose } : Props) {
	const { toast } = useToast()

	const {createPedagogicElement} =  usePedagogicElement()

	const newPedagogicalElementForm
		= useForm<PedagogicalElementSchema>({
			resolver: zodResolver(pedagogicalElementSchema),

		})

	const onSubmit = async (data: PedagogicalElementSchema) => {

		await createPedagogicElement({
			...data
		})
			.then((response) => {
				onClose();
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
			<Form {...newPedagogicalElementForm}>
				<form onSubmit={newPedagogicalElementForm.handleSubmit(onSubmit)}>
					<div className="grid gap-y-5">
						<FormField
							control={newPedagogicalElementForm.control}
							name="elementTitle"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Titre</FormLabel>
									<FormControl>
										<Input className="bg-muted/10" type="text"  {...field}/>
									</FormControl>
									<FormMessage className="text-xs font-medium" />
								</FormItem>
							)}
						/>
						<div className="grid md:grid-cols-2 gap-5">
							<FormField
								control={newPedagogicalElementForm.control}
								name="elementTypeId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type d'élement</FormLabel>
										<FormControl>
											<Select
												onValueChange={(value) => newPedagogicalElementForm.setValue("elementTypeId", value)}
											>
												<SelectTrigger className={cn(
													field.value || "text-muted-foreground", "bg-muted/10"

												)}>
													<SelectValue  placeholder="Type"></SelectValue>
												</SelectTrigger>
												<SelectContent>
													{elementTypes?.map((type) => (<SelectItem key={type?.id} value={type?.id}>{type?.typeTitle}</SelectItem>))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-xs font-medium" />
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
													{levels?.map((level) => (<SelectItem key={level?.id} value={level?.id}>{level?.levelTitle}</SelectItem>))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage className="text-xs font-medium" />
									</FormItem>
								)}
							/>
						</div>
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
												{professors?.map((professor) => (<SelectItem key={professor?.id} value={professor?.id}>{professor?.firstName} {professor?.lastName}</SelectItem>))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage className="text-xs font-medium" />
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
												{professors?.map((professor) => (<SelectItem key={professor?.id} value={professor?.id}>{professor?.firstName} {professor?.lastName}</SelectItem>))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage className="text-xs font-medium" />
								</FormItem>
							)}
						/>
						<div className="grid justify-end">
							<Button size="sm" type="submit"  className="flex items-center gap-x-1.5">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
								</svg>
								Créer
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
}