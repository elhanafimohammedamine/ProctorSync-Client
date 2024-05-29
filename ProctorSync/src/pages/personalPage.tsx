import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfessorsCard from "@/components/ProfessorsCard.tsx";
import AdministratorsCard from "@/components/AdministratorsCard.tsx";

export default function PersonalPage() {


	return <Tabs defaultValue="professors" className="w-full">
		<TabsList>
			<TabsTrigger value="professors">Enseignants</TabsTrigger>
			<TabsTrigger value="administrators">Administrateurs</TabsTrigger>
		</TabsList>
		<TabsContent value="professors"><ProfessorsCard /></TabsContent>
		<TabsContent value="administrators"><AdministratorsCard /></TabsContent>
	</Tabs>

}