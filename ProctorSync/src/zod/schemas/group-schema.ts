import {z} from "zod";
export const groupFormSchema = z.object({
    groupName: z.string({
        required_error: "Le nom de groupe est requis.",
    }).min(3,{message: "Le nom de groupe doit comporter au moins 5 caractères"})
    .max(30,{message: "Le nom de groupe ne doit pas dépasser 30 caractères"}),
    description: z.string().optional(),
})