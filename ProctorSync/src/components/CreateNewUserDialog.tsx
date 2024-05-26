import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog.tsx";
import CreateNewUserForm from "@/components/CreateNewUserForm.tsx";


export default function CreateNewUserDialog() {

	return <Dialog>
		<DialogTrigger className="flex items-center gap-x-3 border  px-3 py-2  rounded-lg text-white font-medium hover:bg-primary/90 bg-primary">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
				<path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
			</svg>
			Ajouter un personnel
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="flex items-center gap-x-3">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
					</svg>
					Créer un nouvel personnel</DialogTitle>
				<DialogDescription>
					This action cannot be undone. This will permanently delete your account
					and remove your data from our servers.
				</DialogDescription>
			</DialogHeader>
			<CreateNewUserForm />
		</DialogContent>

	</Dialog>
}