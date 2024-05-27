import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Building2, SquarePen, Trash2, UsersRound} from "lucide-react";


export default function ClassroomCard() {


	return <Card className="rounded-xl">
		<CardHeader className="p-0">
			<div className="h-44 bg-green-500 rounded-t-xl">

			</div>
		</CardHeader>
		<CardContent>
			<div className="pt-4">
				<h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
					Nom de salle
				</h3>
				<div className="flex items-center gap-x-5 mt-3">
					<div className="flex items-center gap-x-2">
						<UsersRound className="size-4 text-primary" />
						<span className="text-xs font-medium text-muted-foreground">22 sièges</span>
					</div>
					<div className="flex items-center gap-x-2">
						<Building2 className="size-4 text-primary" />
						<span className="text-xs font-medium text-muted-foreground">Bloc A</span>
					</div>
				</div>
			</div>
		</CardContent>
		<CardFooter className="border-t p-0 mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
			<button className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
				<Trash2 className="size-4" />
				Supprimer
			</button>
			<button className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
				<SquarePen className="size-4" />
				Modidier
			</button>
		</CardFooter>
	</Card>
}