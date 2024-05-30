import {z} from "zod";
export const examFirstStepFormSchema = z.object({
    sessionId: z.string({
        required_error: "La session d'éxamen est requise.",
    }),
    examTypeId: z.string({
        required_error: "Le type d'éxamen est requis",
    }),
    subjectId: z.string({
        required_error: "La matière d'éxamen est requise",
    }),
    academicYear: z.string({
        required_error: "Année universitaire est requise"
    })
})

export const examSecondStepFormSchema = z.object({
    examDate: z.string({
        required_error: "La date d'éxamen est requise.",
    }),
    startTime: z.string({
        required_error: "Heure de début est requise"
    }),
    plannedDuration: z.coerce.number({
        required_error: "Durée prévue est requise"
    }),
    actualDuration: z.coerce.number().optional(),
}).refine((data) => {
    const isStartTimeValid = (startTime : string) => {
        const [hours, minutes] = startTime.split(":").map(Number);
        const startTimeDate = new Date();
        startTimeDate.setHours(hours);
        startTimeDate.setMinutes(minutes);
        return startTimeDate <= new Date(startTimeDate.getFullYear(), startTimeDate.getMonth(), startTimeDate.getDate(), 18, 30);
    };

    const isDurationValid = (startTime : string, duration : number) => {
        const [hours, minutes] = startTime.split(":").map(Number);
        const startTimeDate = new Date();
        startTimeDate.setHours(hours);
        startTimeDate.setMinutes(minutes);

        const plannedDurationMillis = duration * 1000;
        const endTime = new Date(startTimeDate.getTime() + plannedDurationMillis);

        return endTime <= new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), 18, 31);
    };

    const { startTime, plannedDuration, actualDuration } = data;

    if (!isStartTimeValid(startTime)) {
        return false;
    }

    if (actualDuration) {
        if (!isDurationValid(startTime, actualDuration)) {
            return false;
        }
    } else {
        if (!isDurationValid(startTime, plannedDuration)) {
            return false;
        }
    }

    return true;
}, {
    message: "L'heure de fin de l'examen dépasse 18:30.",
    path: ["startTime"],
});


const roomSchema = z.object({
    roomId: z.string(),
});
export const examThirdStepFormSchema = z.object({
    roomIds: z.array(roomSchema)
})

export const FullExamFormSchema = z.union([examFirstStepFormSchema, examSecondStepFormSchema, examThirdStepFormSchema])

export type StepOneExamForm = z.infer<typeof examFirstStepFormSchema>;
export type StepTwoExamForm = z.infer<typeof examSecondStepFormSchema>;
export type StepThreeExamForm = z.infer<typeof examThirdStepFormSchema>;
export type FullExamFrom = z.infer<typeof FullExamFormSchema>;

