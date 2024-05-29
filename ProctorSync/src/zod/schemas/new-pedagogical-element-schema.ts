import {z} from "zod";


export const pedagogicalElementSchema = z.object({

	elementTitle: z.string({
		required_error: "Le titre est requis.",
		invalid_type_error: "Le titre doit être une chaîne de caractères.",
	})
		.max(50, {message: 'Le titre ne doit pas dépasser 50 caractères.'
	})
		.min(3, {message:'Le titre doit contenir au moins 3 caractères.'})
		.max(50, {message: 'Le titre ne doit pas dépasser 50 caractères.'})
		.toLowerCase(),

	professorId : z.string({
		required_error: "Le professeur est requis.",
	}),

	coordinatorId : z.string({
		required_error: "Le coordinateur est requis.",
	}),

	levelId: z.string({
		required_error: "Le niveau est requis.",
	}),

	elementTypeId: z.string({
		required_error: "Le type d'élément est requis.",
	}),


});


export type PedagogicalElementSchema = z.infer<typeof pedagogicalElementSchema>;