import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    examFirstStepFormSchema, examSecondStepFormSchema, examThirdStepFormSchema,
    FullExamFormSchema,
    FullExamFrom,
    StepOneExamForm,
    StepThreeExamForm,
    StepTwoExamForm
} from "@/zod/schemas/exam-schema.ts";
import ExamFirstStepForm from "@/components/ExamFirstStepForm.tsx";
import ExamSecondStepForm from "@/components/ExamSecondStepForm.tsx";
import ExamThirdStepForm from "@/components/ExamThirdStepForm.tsx";
import {addSeconds, format} from "date-fns";

export default function ExamMultiStepsForm(){
    const steps = [
        {
            index: 1,
            element: "form1",
            elementDescription: "Informations Générales",
        },
        {
            index: 2,
            element: "form2",
            elementDescription: "Informations sur le timing",
        },
        {
            index: 3,
            element: "form3",
            elementDescription: "Salles d'examen",
        },
    ]

    const [activeStep, setActiveStep] = useState(1);
    const [activeTab, setActiveTab] = useState("form1");
    const stepOneForm = useForm<StepOneExamForm>({
        resolver: zodResolver(examFirstStepFormSchema),
    })
    const stepTwoForm = useForm<StepTwoExamForm>({
        resolver: zodResolver(examSecondStepFormSchema),
    })
    const stepThreeForm = useForm<StepThreeExamForm>({
        resolver: zodResolver(examThirdStepFormSchema),
    })
    const fullExamFrom = useForm<FullExamFrom>({
        resolver: zodResolver(FullExamFormSchema),
    })

    const handleNext = async () => {
        let activeForm;
        switch (activeTab) {
            case "form1":
                activeForm = stepOneForm;
                break;
            case "form2":
                activeForm = stepTwoForm;
                break;
            case "form3":
                activeForm = stepThreeForm;
                break;
        }

        const isValid = await activeForm!.trigger();
        if(isValid) {
            const currentFormValues = activeForm!.getValues();
            Object.entries(currentFormValues).forEach(([key, value]) => {
                // @ts-ignore
                fullExamFrom.setValue(key, value);
            });
            if (activeStep < steps.length) {
                const nextStep = activeStep + 1;
                setActiveStep(nextStep);
                setActiveTab(steps[nextStep - 1].element);
            }

            if(activeStep === steps.length){
                // handle form submission here
                console.log(fullExamFrom.getValues())
            }
        }
    };

    const computeDateTime = () => {

        if (activeStep === 3) {
            const startDate = fullExamFrom.getValues('examDate')
            const plannedDuration = fullExamFrom.getValues('plannedDuration')
            const actualDuration = fullExamFrom.getValues('actualDuration')
            const startTime = fullExamFrom.getValues('startTime')

            const startDateTime = format(new Date(`${startDate} ${startTime}`), 'yyyy-MM-dd HH:mm:ss')
            const duration = actualDuration ? actualDuration : plannedDuration
            const endDateTime = format(addSeconds(new Date(startDateTime), duration), 'yyyy-MM-dd HH:mm:ss')
            return <ExamThirdStepForm startDateTime={startDateTime} endDateTime={endDateTime} form={stepThreeForm}/>
        }


    }


    const handleBack = () => {
        if (activeStep > 1) {
            const prevStep = activeStep - 1;
            setActiveStep(prevStep);
            setActiveTab(steps[prevStep - 1].element);
        }
    };

    const handleTabChange = (value: string) => {
        const stepIndex = steps.findIndex(step => step.element === value) + 1;
        setActiveStep(stepIndex);
        setActiveTab(value);
    };

    return (
        <section className="min-h-96 flex flex-col justify-between">
            <Tabs defaultValue="form1" value={activeTab} onValueChange={handleTabChange} className="space-y-6">
                <div className="px-3 md:px-6">
                    <TabsList className="bg-transparent w-full">
                        <TabsList className="bg-transparent flex justify-between md:justify-center gap-x-4 w-full">
                            {steps.map(step => (
                                <div className="flex flex-col md:flex-row justify-between items-center gap-y-2 md:gap-x-2 w-fit" key={step.index}>
                                    <TabsTrigger disabled={step.index !== activeStep} className={cn(step.index < activeStep ? "dark:bg-indigo-600 bg-indigo-200  disabled:opacity-100" : "dark:bg-indigo-950 bg-indigo-100", "disabled:opacity-100 data-[state=active]:dark:bg-indigo-600 data-[state=active]:bg-indigo-200 px-3 py-2 md:px-4 md:py-3 h-10 md:h-14 aspect-square  rounded-full")} value={step.element}>
                                        {
                                            step.index > activeStep - 1 ? step.index : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="size-6 text-accent-foreground">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m4.5 12.75 6 6 9-13.5"/>
                                                </svg>
                                            )
                                        }
                                    </TabsTrigger>
                                    <span className={cn(step.index < activeStep + 1 && "text-accent-foreground", "text-xs md:text-sm font-medium md:text-nowrap")}>{step.elementDescription}</span>
                                    {
                                        step.index < steps.length &&
                                        <span className="h-0.5 hidden md:block rounded-full md:min-w-10 lg:min-w-36 w-full bg-slate-300 dark:bg-slate-500"></span>
                                    }
                                </div>
                            ))}
                        </TabsList>
                    </TabsList>
                </div>
                <TabsContent value="form1">
                    <ExamFirstStepForm form={stepOneForm}/>
                </TabsContent>
                <TabsContent value="form2">
                    <ExamSecondStepForm form={stepTwoForm}/>
                </TabsContent>
                <TabsContent value="form3">
                    {computeDateTime()}
                </TabsContent>
            </Tabs>
            <div className="space-x-2 w-full flex justify-end">
                {    activeStep > 1 &&
                    <Button onClick={handleBack} variant="outline">Retour</Button>
                }
                {    activeStep < steps.length &&
                    <Button onClick={handleNext} className="space-x-1.5">
                        <span>Suivant</span>
                    </Button>
                }
                {
                    activeStep === steps.length &&
                    <Button onClick={handleNext} className="space-x-1.5">
                        <span>Terminer</span>
                    </Button>
                }
            </div>
        </section>
    )
}