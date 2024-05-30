import {UseFormReturn} from "react-hook-form";
import {StepOneExamForm} from "@/zod/schemas/exam-schema.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect} from "react";
import {usePedagogicElement} from "@/hooks/use-pedagogic-element.ts";
import {useExamType} from "@/hooks/use-exam-type.ts";
import {useSession} from "@/hooks/use-session.ts";

interface FirstStepProps {
    form: UseFormReturn<StepOneExamForm>
}

export default function ExamFirstStepForm({form} : FirstStepProps) {
    const generateAcademicYear = () : string => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        if (currentMonth >= 7) {
            return String(currentYear) + " - " + String(currentYear + 1);
        } else {
            return String(currentYear) + " - " + String(currentYear - 1);
        }

    };
    useEffect(() => {
        form.setValue("academicYear", generateAcademicYear());
    }, []);


    const {pedagogicElements} = usePedagogicElement();
    const {examTypes} = useExamType();
    const {sessions} = useSession();


    return (
        <Form {... form}>
            <form className="space-y-6 py-6 md:px-20 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="subjectId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Matière d'Examen</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={(value : string) => form.setValue("subjectId",value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Matière d'examen"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Matière</SelectLabel>
                                                {pedagogicElements?.map((element) => (
                                                    <SelectItem key={element?.id} value={element?.id}>{element?.elementTitle}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="examTypeId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Type d'Examen</FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={(value : string) => form.setValue("examTypeId",value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Type d'examen"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Type d'examen</SelectLabel>
                                                {examTypes?.map((type) => (
                                                    <SelectItem key={type?.id} value={type?.id}>{type?.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sessionId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Session</FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={(value : string) => form.setValue("sessionId",value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Session d'examen"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Session</SelectLabel>
                                                {sessions?.map((session) => (
                                                    <SelectItem key={session?.id} value={session?.id}>{session?.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="academicYear"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Année universitaire</FormLabel>
                                <FormControl>
                                    <Input type="text" disabled defaultValue={generateAcademicYear()}  {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}