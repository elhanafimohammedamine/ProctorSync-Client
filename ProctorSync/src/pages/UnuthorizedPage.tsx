
import {Link} from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import LogoDarkImage from "@/assets/images/proctorsyncTypoDark.svg"
import LogoLightImage from "@/assets/images/proctorsyncTypoLight.svg"
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { SquareArrowOutUpRight } from "lucide-react";

export default function UnuthorizedPage() {
	return (
		<div className="h-screen">
			<div className="h-full flex flex-col flex-nowrap items-center justify-between py-5">
            <Link to="/" className="ml-2 font-bold text-xl flex mt-10">
                <div className="bg-transparent">
                    <img
                        src={LogoLightImage}
                        alt="Image"
                        className="dark:hidden w-[150px] object-cover"
                    />
                    <img
                        src={LogoDarkImage}
                        alt="Image"
                        className="hidden dark:block w-[150px] object-cover"
                    />
                </div>
            </Link>
				<div className="flex flex-col flex-nowrap items-center ">
					<h1 className="block text-7xl font-bold sm:text-9xl ">401</h1>
					<p className="text-center">
                        Vous ne possédez pas les autorisations nécessaires pour accéder à cette ressource.<br/>
                        Veuillez vérifier vos informations d'identification et réessayer.
					</p>
					<Link to="/" className="mt-5">
						<Button  className="flex flex-nowrap items-center gap-x-2 font-medium w-32 justify-center group dark:text-white rounded-full">
                            Retourner
                            <SquareArrowOutUpRight className="size-4" /> 
						</Button>
					</Link>
				</div>
				<section className="text-center text-sm text-muted-foreground">
                    <h3>
                            &copy; {new Date().getFullYear()} ProctorSync made with {""}
                        <span className="relative top-[-2px]">
                            <HeartFilledIcon className="w-4 h-4 text-red-500 inline-block"/>
                        </span>
                    </h3>
                </section>
			</div>
		</div>
	);
}
