import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import ExamEditView from "@/components/ExamEditView.tsx";
import ExamRoomsView from "@/components/ExamRoomsView.tsx";

export default function EditExamPage() {
    return (
        <section className="space-y-8">
            <Tabs defaultValue="examView" className="space-y-4">
                <div className="px-4 md:px-6">
                    <TabsList className="bg-transparent space-x-1 md:space-x-2">
                        <TabsTrigger
                            className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"
                            value="examView">Informations d'Examen</TabsTrigger>
                        <TabsTrigger
                            className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"
                            value="examRooms">Salles d'Examen</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="examView">
                    <ExamEditView/>
                </TabsContent>
                <TabsContent value="examRooms">
                    <ExamRoomsView/>
                </TabsContent>
            </Tabs>
        </section>
    )
}