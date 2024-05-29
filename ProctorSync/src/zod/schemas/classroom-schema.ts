import {z} from "zod";
export const classroomSchema = z.object({
    roomName: z.string({
        required_error: "Le nom de la salle est requis.",
    }).min(5,{message: "Le nom de la salle doit comporter au moins 5 caractères"})
    .max(30,{message: "Le nom de la salle ne doit pas dépasser 30 caractères"}),
    blocName: z.string({
        required_error: "Le nom de bloc est requis.",
    }).min(5,{message: "Le nom de bloc doit comporter au moins 5 caractères"})
        .max(30,{message: "Le nom de bloc ne doit pas dépasser 30 caractères"}),
    capacity: z.coerce.number({
        required_error: "La capacité de la salle est requise",
    }).int().min(1, "La capacité de la salle doit etre supérieure à 1")
        .max(300, "La capacité de la salle doit etre inférieure à 300")
})