import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import EditExamForm from "@/components/EditExamForm.tsx";

export default function ExamEditView() {
    return(
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader>
                <CardTitle className="flex gap-x-2 items-center">
                    <span className="text-2xl md:text-3xl">Informations d'Examen</span>
                </CardTitle>
                <CardDescription className="text-sm md:text-lg">Informations générales sur l'éxamen</CardDescription>
            </CardHeader>
            <CardContent>
                <Card className="bg-card border-0 rounded-xl">
                    <CardContent>
                        <EditExamForm/>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}