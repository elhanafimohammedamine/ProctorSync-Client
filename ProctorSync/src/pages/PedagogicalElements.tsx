import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {MoreHorizontal, Search} from "lucide-react";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import Paginator from "@/components/Paginator.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import CreateNewPedagogicalElementDialog from "@/components/CreateNewPedagogicalElementDialog.tsx";

export default function PedagogicalElements() {
	const [currentPage, setCurrentPage] = useState<number>(1);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// @ts-ignore
	const [totalPages, setTotalPages] = useState<number>(1);

	const handlePageChange = (currentPage : number) => {
		setCurrentPage(currentPage);
	};



	return(
		<Card className="bg-card border-0" x-chunk="dashboard-06-chunk-0">
			<CardHeader className="p-4 md:p-6 flex flex-row items-center justify-between">
				<div>
					<CardTitle className="text-2xl md:text-3xl">Les élements enseignés</CardTitle>
					<CardDescription className="text-sm md:text-lg">
						Gérer le éléments pédagogiques enseignés à l'école nationale des science appliquées d'Al Hoceima.
					</CardDescription>
				</div>
				<CreateNewPedagogicalElementDialog />
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
								<TableHead>Titre</TableHead>
								<TableHead>Enseignant</TableHead>
								<TableHead>Coordinateur</TableHead>
								<TableHead>Niveau</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow className="bg-primary/5 dark:bg-muted/20 hover:bg-primary/10 dark:hover:bg-muted/10">
								<TableCell>
									Java EE + spring framework
								</TableCell>
								<TableCell className="font-medium">
									firstName + lastname
								</TableCell>
								<TableCell className="font-medium">
									firstName + lastname
								</TableCell>
								<TableCell className="font-medium">
									Génie informatique 2
								</TableCell>
								<TableCell>
									<Badge>Module</Badge>
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
							<TableRow className="bg-primary/5 dark:bg-muted/20 hover:bg-primary/10 dark:hover:bg-muted/10">
								<TableCell colSpan={7} className="w-full text-center text-sm italic text-muted-foreground">
									Aucun élément trouvé
								</TableCell>
							</TableRow>

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