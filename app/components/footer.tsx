import { cn } from "@/lib/utils";
import Link from "next/link";
import { BiCustomize } from "react-icons/bi";
import { Separator } from "./ui/separator";

type FooterProps = React.ComponentProps<"footer">

export function Footer({className, ...props}: FooterProps) {
  return (
    <footer className={cn("flex justify-center py-8 mt-auto", className)} {...props}>
      <div className="flex flex-col items-center gap-8">
        <Link href="/">
          <BiCustomize className="text-5xl" />
        </Link>
        <div className="flex flex-wrap justify-center gap-6 text-xl">
          <Link href="/">Главная</Link>
          <Link href="/resume">Резюме</Link>
          <Link href="/orders">Заказы</Link>
          <Link href="/profile">Профиль</Link>
          <Link href="/login">Войти</Link>
        </div>
        <Separator className="h-[2px] w-full max-w-[400px]" />
        <p className="text-xl">© 2024 WorkFlow</p>
      </div>
    </footer>
  )
}