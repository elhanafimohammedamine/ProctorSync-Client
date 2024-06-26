import { HeartFilledIcon } from "@radix-ui/react-icons";
import LogoDarkImage from "@/assets/images/proctorsyncTypoDark.svg"
import LogoLightImage from "@/assets/images/proctorsyncTypoLight.svg"
import { Link } from "react-router-dom";

export function Footer() {
  return (
      <footer id="footer" className="relative">
        <hr className="w-full"/>
        <section className="container flex flex-col md:flex-row justify-center items-center gap-x-4 py-12">
          <div className="col-span-full xl:col-span-2">
            <Link to="/" className="ml-2 font-bold text-xl flex">
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
          </div>
          <section className="text-center text-sm text-muted-foreground">
            <h3>
              &copy; {new Date().getFullYear()} ProctorSync made with {""}
              <span className="relative top-[-2px]">
            <HeartFilledIcon className="w-4 h-4 text-red-500 inline-block"/>
          </span>
            </h3>
          </section>
        </section>
      </footer>
  );
}
