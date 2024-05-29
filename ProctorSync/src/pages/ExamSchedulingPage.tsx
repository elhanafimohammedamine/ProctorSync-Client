import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import ExamMultiStepsForm from "@/components/ExamMultiStepsForm.tsx";

export default function ExamSchedulingPage() {
    return (
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="px-4 md:px-6">
                <CardTitle className="text-xl md:text-2xl">Créer un Examen</CardTitle>
                <CardDescription className="text-sm md:text-sm"> Ajouter les informations nécessaires ici. Cliquez sur terminer lorsque vous avez terminé.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-6 md:space-y-12">
                <ExamMultiStepsForm/>
            </CardContent>
        </Card>
    )
}