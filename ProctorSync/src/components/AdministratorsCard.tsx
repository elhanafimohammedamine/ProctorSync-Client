import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal, Search} from "lucide-react";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import Paginator from "@/components/Paginator.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {format} from "date-fns";
import {useAdministrator} from "@/hooks/use-administrator.ts";
import CreateNewAdministratorDialog from "@/components/CreateNewAdministratorDialog.tsx";
import {Loader} from "@/components/Loader.tsx";

export default function AdministratorsCard() {
	const [currentPage, setCurrentPage] = useState<number>(1);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// @ts-ignore
	const [totalPages, setTotalPages] = useState<number>(1);

	const handlePageChange = (currentPage : number) => {
		setCurrentPage(currentPage);
	};


	const {administrators, administratorsAreLoading} = useAdministrator();


	if (administratorsAreLoading) return <Loader />;

	return(
		<Card className="bg-card border-0" x-chunk="dashboard-06-chunk-0">
			<CardHeader className="px-4 md:px-6 flex flex-row items-center justify-between">
				<div className="space-y-2">
					<CardTitle className="text-2xl md:text-3xl">Les administrateurs</CardTitle>
					<CardDescription className="text-sm md:text-lg">
						Gérer les administrateurs de la plate-forme et consulter leurs coordonnées.
					</CardDescription>
				</div>
				<CreateNewAdministratorDialog />
			</CardHeader>
			<CardContent className="p-4 md:p-6 overflow-hidden space-y-6 md:space-y-8">
				<div className="relative flex-1 md:grow-0">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
					<Input
						type="search"
						placeholder="Search..."
						className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
					/>
				</div>
				<ScrollArea className="w-full whitespace-nowrap rounded-md">
					<Table>
						<TableHeader>
							<TableRow className="bg-primary/10 hover:bg-primary/15 dark:bg-muted/30 dark:hover:bg-muted/30">
								<TableHead className="hidden w-[100px] sm:table-cell">
									<span className="sr-only">Image</span>
								</TableHead>
								<TableHead>Prénom</TableHead>
								<TableHead>Nom</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Téléphone</TableHead>
								<TableHead>Crée à</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{administrators?.length !== 0 ? administrators?.map((administrator) => (
								<TableRow key={administrator?.id} className="bg-primary/5 dark:bg-muted/20 hover:bg-primary/10 dark:hover:bg-muted/10">
									<TableCell className="hidden sm:table-cell">
										<Avatar className="rounded-lg">
											<AvatarFallback className="rounded-lg bg-gray-200 dark:bg-muted-foreground/15 font-medium">
												{administrator?.firstName?.charAt(0)?.toUpperCase()}{administrator?.lastName?.charAt(0)?.toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</TableCell>
									<TableCell className="font-medium">
										{administrator?.firstName?.charAt(0).toUpperCase() + administrator?.firstName?.slice(1)}
									</TableCell>
									<TableCell className="font-medium">
										{administrator?.lastName?.charAt(0).toUpperCase() + administrator?.lastName?.slice(1)}
									</TableCell>
									<TableCell>
										{administrator?.email}
									</TableCell>
									<TableCell>
										{administrator?.phone}
									</TableCell>
									<TableCell>
										{format(administrator?.createdAt, "yyyy-MM-dd HH:mm a")}
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													aria-haspopup="true"
													size="icon"
													variant="ghost"
												>
													<MoreHorizontal className="h-4 w-4"/>
													<span className="sr-only">Toggle menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem>
													action2
												</DropdownMenuItem>
												<DropdownMenuItem>
													action1
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							)) : (
								<TableRow className="bg-primary/5 dark:bg-muted/20 hover:bg-primary/10 dark:hover:bg-muted/10">
									<TableCell colSpan={8} className="w-full text-center text-sm font-light italic text-muted-foreground">
										Aucun Administrateur trouvé
									</TableCell>
								</TableRow>
							)}


						</TableBody>
					</Table>
					<ScrollBar orientation="horizontal"/>
				</ScrollArea>
				<div className="flex justify-start">
					<Paginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={(pageNumber) => handlePageChange(pageNumber)}
						showPreviousNext
					/>
				</div>
			</CardContent>
			<CardFooter>
			</CardFooter>
		</Card>
	)
}