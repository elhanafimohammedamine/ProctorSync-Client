import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfessorsCard from "@/components/ProfessorsCard.tsx";
import AdministratorsCard from "@/components/AdministratorsCard.tsx";

export default function PersonalPage() {


	return <Tabs defaultValue="professors" className="w-full space-y-6">
		<TabsList className="bg-transparent space-x-1 md:space-x-2">
			<TabsTrigger
				className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"
				value="professors">Enseignants</TabsTrigger>
			<TabsTrigger
				className="data-[state=active]:bg-primary/10 bg-muted/30 px-3 py-2 md:px-4 md:py-3 rounded-full"
				value="administrators">Administrateurs</TabsTrigger>
		</TabsList>
		<TabsContent value="professors"><ProfessorsCard/></TabsContent>
		<TabsContent value="administrators"><AdministratorsCard/></TabsContent>
	</Tabs>

}