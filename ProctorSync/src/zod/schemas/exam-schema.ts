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
    coordinatorId: z.string({
        required_error: "Le coordinateur d'éxamen est requise",
    }),
/*    academicYear: z.string({
        required_error: "Année universitaire est requise"
    }),*/
})

export const examSecondStepFormSchema = z.object({
    examDate: z.string({
        required_error: "La date d'éxamen est requise.",
    }),
    startTime: z.string({
        required_error: "Heure de début est requise"
    }),
    plannedDuration: z.string({
        required_error: "Durée prévue est requise"
    }),
    actualDuration: z.string().optional(),
})


export const examThirdStepFormSchema = z.object({
    roomIds: z.array(z.string())
})

export const mergedSchema = examFirstStepFormSchema.merge(examSecondStepFormSchema).merge(examThirdStepFormSchema);
export const FullExamFormSchema = mergedSchema.refine((data, context) => {
    const isStartTimeValid = (startTime : string) => {
        const [hours, minutes] = startTime.split(":").map(Number);
        const startTimeDate = new Date();
        startTimeDate.setHours(hours);
        startTimeDate.setMinutes(minutes);
        return startTimeDate <= new Date(startTimeDate.getFullYear(), startTimeDate.getMonth(), startTimeDate.getDate(), 18, 30);
    };

    const isDurationValid = (startTime :string, duration :string) => {
        const [hours, minutes] = startTime.split(":").map(Number);
        const startTimeDate = new Date();
        startTimeDate.setHours(hours);
        startTimeDate.setMinutes(minutes);

        const plannedDurationSeconds = parseInt(duration);
        const plannedDurationMillis = plannedDurationSeconds * 1000;
        const endTime = new Date(startTimeDate.getTime() + plannedDurationMillis);

        return endTime <= new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), 18, 30);
    };

    const { startTime, plannedDuration, actualDuration } = data;

    if (!isStartTimeValid(startTime)) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Start time cannot exceed 18:30.",
        });
    }

    if (actualDuration) {
        if (!isDurationValid(startTime, actualDuration)) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Actual duration exceeds 18:30.",
            });
        }
    } else {
        if (!isDurationValid(startTime, plannedDuration)) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Planned duration exceeds 18:30.",
            });
        }
    }
}, {
    message: "L'heure de début ou la durée de l'examen dépasse 18:30.",
    path: ["startTime", "plannedDuration", "actualDuration"],
});
export type StepOneExamForm = z.infer<typeof examFirstStepFormSchema>;
export type StepTwoExamForm = z.infer<typeof examSecondStepFormSchema>;
export type StepThreeExamForm = z.infer<typeof examThirdStepFormSchema>;
export type FullExamFrom = z.infer<typeof FullExamFormSchema>;

