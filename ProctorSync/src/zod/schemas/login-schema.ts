import {z} from "zod";
export const loginFormSchema = z.object({
    email: z.string({
        required_error: "Adress email est requise",
    }).email({message: "Adress email est invalide"}),
    password: z.string({
        required_error: "Mot de passe est requis",
    })
})