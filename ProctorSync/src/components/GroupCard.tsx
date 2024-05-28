import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import DeleteEntityDialog from "@/components/DeleteEntityDialog.tsx";
import {Trash2} from "lucide-react";
import {useState} from "react";


export default function GroupCard() {

	const [isDeleteOpen, setDeleteOpen] = useState(false);
	const toggleDeleteDialog = () => setDeleteOpen(!isDeleteOpen)

	return <Card className="rounded-xl bg-card">
		<CardHeader className="p-0">
			<div className="h-44 bg-red-600 rounded-t-xl">

			</div>
		</CardHeader>
		<CardContent>
			<div className="pt-4">
				<h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
					Nom du groupe
				</h3>
				<p className="mt-3 text-sm text-muted-foreground">
					A software that develops products for software developers and developments.
				</p>
				<div className="flex items-center gap-x-5 mt-3">
					<div className="flex items-center gap-x-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-primary">
							<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
						</svg>
						<span className="text-xs font-medium text-muted-foreground">22 membre</span>
					</div>
				</div>
			</div>
		</CardContent>
		<CardFooter className="p-0 mt-auto flex border-t border-border divide-x divide-border">
			<button className="w-full whitespace-nowrap py-3 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-medium rounded-es-xl bg-card text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-muted/20">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
					<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
					<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
				</svg>
				Voir les membres
			</button>
			<button onClick={toggleDeleteDialog} className="w-full text-red-600 dark:text-red-600 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-medium rounded-none rounded-ee-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none bg-card border-border dark:hover:bg-muted/20">
				<Trash2 className="size-4"/>
				Supprimer
			</button>
			<DeleteEntityDialog isOpen={isDeleteOpen} toggleOpen={toggleDeleteDialog} entityName="groupe"/>
		</CardFooter>
	</Card>
}