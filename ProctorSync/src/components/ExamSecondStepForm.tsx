import {UseFormReturn} from "react-hook-form";
import {StepTwoExamForm} from "@/zod/schemas/exam-schema.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format, isBefore, startOfDay} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
interface SecondStepProps {
    form: UseFormReturn<StepTwoExamForm>
}
export default function ExamSecondStepForm({form} : SecondStepProps) {
    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 8; hour <= 16; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                options.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        return options;
    };

    const calculateDurationInSeconds = (hours : number, minutes: number) => {
        return (hours * 3600) + (minutes * 60);
    };

    const durations: {label: string, value: number}[] = [];
    for (let hours = 0; hours <= 3; hours++) {
        const startMinutes = hours === 0 ? 45 : 0;

        for (let minutes = startMinutes; minutes < 60; minutes += 15) {
            const durationInSeconds = calculateDurationInSeconds(hours, minutes);
            const label = `${hours > 0 ? hours + " heure" + (hours > 1 ? "s" : "") : ""} ${minutes > 0 ? minutes + " minute" + (minutes > 1 ? "s" : "") : ""}`;

            durations.push({ label, value: durationInSeconds });
        }
    }

    return (
        <Form {... form}>
            <form  className="space-y-6 py-6 md:px-20 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="examDate"
                        render={({field}) => (
                            <FormItem className="flex flex-col gap-y-2">
                                <FormLabel className="block mt-0.5">Date d'Examen</FormLabel>
                                <Popover>
                                    <FormControl>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                                     stroke="currentColor" className="mr-2 h-4 w-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                                </svg>

                                                {field.value ? (
                                                    format(field.value, "dd/MM/yyyy")
                                                ) : (
                                                    <span>Choisissez une date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                    </FormControl>
                                    <PopoverContent className="p-0 px-3 flex items-center">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(field.value)}
                                            onSelect={(date) => field.onChange(date && format(date, "yyyy-MM-dd"))}
                                            disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Heure de début</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value : string) => form.setValue("startTime",value)} {...field}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="heure de début d'examen"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Heures</SelectLabel>
                                                {generateTimeOptions().map((time) => (
                                                    <SelectItem key={time} value={time}>
                                                        {time}
                                                    </SelectItem>
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
                        name="plannedDuration"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Durée prévue</FormLabel>
                                <FormControl>
                                    <Select value={String(field)} onValueChange={(value : string) => form.setValue("plannedDuration",parseInt(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Durée prévue d'examen"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Durée possibles</SelectLabel>
                                                <SelectItem value={String(calculateDurationInSeconds(1, 30))}>1 heure 30 minutes</SelectItem>
                                                <SelectItem value={String(calculateDurationInSeconds(2, 0))}>2 heures</SelectItem>
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
                        name="actualDuration"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Durée réelle</FormLabel>
                                <FormControl>
                                    <Select value={String(field)}  onValueChange={(value : string) => form.setValue("actualDuration",parseInt(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Durée réelle d'examen"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Durée possibles</SelectLabel>
                                                {durations.map((duration) => (
                                                    <SelectItem key={duration.value} value={String(duration.value)}>
                                                        {duration.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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