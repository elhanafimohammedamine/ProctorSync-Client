import {z} from "zod";
export const loginFormSchema = z.object({
    email: z.string({
        required_error: "Adresse email est requise",
    }).email({message: "Adresse email est invalide"}),


    password: z.string({
        required_error: "Mot de passe est requis",
    })
        .min(8, {message: "Le mot de passe doit contenir au moins 8 caractères"})
        .max(100, {message: "Le mot de passe doit contenir au plus 100 caractères"})
})