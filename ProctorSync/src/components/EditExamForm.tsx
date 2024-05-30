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
import {useForm} from "react-hook-form";
import {FullExamFormSchema, FullExamFrom} from "@/zod/schemas/exam-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format, isBefore, startOfDay} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {
    calculateDurationInSeconds,
    durations,
    generateAcademicYear,
    generateTimeOptions
} from "@/helpers/HelperTimeFunctions.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useEffect, useState} from "react";

export default function EditExamForm(){
    const fullExamFrom = useForm<FullExamFrom>({
        resolver: zodResolver(FullExamFormSchema),
        defaultValues: {
            academicYear: generateAcademicYear(),
            examinationPaper: null,
            pv: null,
        }
    })

    const [examFile, setExamFile] = useState<File>(new File([], ""));
    const [PvFile, setPvFile] = useState<File>(new File([], ""));


    const handleExamFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files || event.target.files.length === 0) {
            return;
        }
        const file = event.target.files[0] as File;
        setExamFile(file);
    };

    const handlePvFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files || event.target.files.length === 0) {
            return;
        }
        const file = event.target.files[0] as File;
        setPvFile(file);
    };

    function onSubmit(values : FullExamFrom) {
        console.log(fullExamFrom.getValues())
    }

    useEffect(() => {
        fullExamFrom.setValue("pv", PvFile);
        fullExamFrom.setValue("examinationPaper", examFile);
    }, [examFile, PvFile]);


    return(
        <Form {...fullExamFrom}>
            <form onSubmit={fullExamFrom.handleSubmit(onSubmit)} className="space-y-8 py-6 md:px-20 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={fullExamFrom.control}
                        name="subjectId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Matière d'Examen</FormLabel>
                                <FormControl>
                                    <Select value={field.value}
                                            onValueChange={(value: string) => fullExamFrom.setValue("subjectId", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Matière d'examen"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Matière</SelectLabel>
                                                <SelectItem value="ProgrammationJava">Programation Java</SelectItem>
                                                <SelectItem value="ProgramationSpring">Programation Spring Boot</SelectItem>
                                                <SelectItem value="ProgramationC">Programation C++</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={fullExamFrom.control}
                        name="examTypeId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Type d'Examen</FormLabel>
                                <FormControl>
                                    <Select {...field}
                                            onValueChange={(value: string) => fullExamFrom.setValue("examTypeId", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Type d'examen"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Examen Type</SelectLabel>
                                                <SelectItem value="Final">Examen Final</SelectItem>
                                                <SelectItem value="Survellié1">Devoire Survellié 1</SelectItem>
                                                <SelectItem value="Survellié2">Devoire Survellié 2</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={fullExamFrom.control}
                        name="sessionId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Session</FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={(value: string) => fullExamFrom.setValue("sessionId", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Session d'examen"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Session</SelectLabel>
                                                <SelectItem value="Normale">Session Normale</SelectItem>
                                                <SelectItem value="Rattrapage">Session Rattrapage</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={fullExamFrom.control}
                        name="academicYear"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Année universitaire</FormLabel>
                                <FormControl>
                                    <Input type="text" disabled  {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={fullExamFrom.control}
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
                        control={fullExamFrom.control}
                        name="startTime"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Heure de début</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value: string) => fullExamFrom.setValue("startTime", value)} {...field}>
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
                        control={fullExamFrom.control}
                        name="plannedDuration"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Durée prévue</FormLabel>
                                <FormControl>
                                    <Select {...field}
                                            onValueChange={(value: string) => fullExamFrom.setValue("plannedDuration", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Durée prévue d'examen"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Durée possibles</SelectLabel>
                                                <SelectItem value={String(calculateDurationInSeconds(1, 30))}>1 heure 30
                                                    minutes</SelectItem>
                                                <SelectItem value={String(calculateDurationInSeconds(2, 0))}>2
                                                    heures</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={fullExamFrom.control}
                        name="actualDuration"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Durée réelle</FormLabel>
                                <FormControl>
                                    <Select {...field}
                                            onValueChange={(value: string) => fullExamFrom.setValue("actualDuration", value)}>
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
                    <FormField
                        control={fullExamFrom.control}
                        name="report"
                        render={({field}) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Rapport Textuel</FormLabel>
                                <FormControl>
                                    <Textarea className="max-h-28"
                                              placeholder="Tapez ici le rapport de l'éxamen"
                                              {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={fullExamFrom.control}
                        name="examinationPaper"
                        render={() => (
                            <FormItem className="md:col-span-1">
                                <FormLabel>Epreuve d'Examen</FormLabel>
                                <div
                                    className="relative flex justify-center items-center gap-x-2 h-10 bg-background border border-input rounded-md overflow-hidden">
                                    <span className="z-40">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                                        </svg>
                                    </span>
                                    <FormControl className="absolute top-0 left-0 h-6 md:h-10 rounded-full">
                                        <Input
                                            type="file"
                                            className="opacity-0 z-40"
                                            onChange={handleExamFileChange}
                                        />
                                    </FormControl>
                                    <span className="text-sm">{examFile.name || 'Aucun fichier sélectionné'}</span>
                                </div>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={fullExamFrom.control}
                        name="pv"
                        render={() => (
                            <FormItem className="md:col-span-1">
                                <FormLabel>PV d'Examen</FormLabel>
                                <div
                                    className="relative flex justify-center items-center gap-x-2 h-10 bg-background border border-input rounded-md overflow-hidden">
                                    <span className="z-40">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                                        </svg>
                                    </span>
                                    <FormControl className="absolute top-0 left-0 h-6 md:h-10 rounded-full">
                                        <Input
                                            type="file"
                                            className="opacity-0 z-40"
                                            onChange={handlePvFileChange}
                                        />
                                    </FormControl>
                                    <span className="text-sm">{PvFile.name || 'Aucun fichier sélectionné'}</span>
                                </div>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end">
                    <Button type="submit" className="space-x-2 w-full md:w-fit">
                        <span>Modifier</span>
                    </Button>
                </div>
            </form>
        </Form>
    )
}