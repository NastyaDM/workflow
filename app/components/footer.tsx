"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { BiCustomize, BiLogOut } from "react-icons/bi";
import { Separator } from "./ui/separator";
import { BiHome } from "react-icons/bi";
import { BiBriefcase } from "react-icons/bi";
import { BiBook } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type FooterProps = React.ComponentProps<"footer">;

export function Footer({ className, ...props }: FooterProps) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <footer
      className={cn("flex justify-center py-8 mt-auto", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-8">
        <Link href="/">
          <BiCustomize className="text-5xl" />
        </Link>
        <div className="flex flex-wrap justify-center gap-6 text-xl">
          <div className="flex gap-2 items-center">
            <BiHome />
            <Link href="/">Главная</Link>
          </div>
          <div className="flex gap-2 items-center">
            <BiBriefcase />
            <Link href="/resume">Резюме</Link>
          </div>
          <div className="flex gap-2 items-center">
            <BiBook />
            <Link href="/orders">Заказы</Link>
          </div>
          <div className="flex gap-2 items-center">
            <BiUser />
            <Link href="/profile">Профиль</Link>
          </div>
          {session?.user ? (
            <Button
              type="button"
              variant="link"
              className="gap-2 text-current font-normal hover:no-underline p-0"
              onClick={() => {
                signOut({
                  redirect: false,
                }).then(() => router.push("/login"));
              }}
            >
              <BiLogOut />
              Выйти
            </Button>
          ) : (
            <div className="flex gap-2 items-center">
              <BiLogIn />
              <Link href="/login">Войти</Link>
            </div>
          )}
        </div>
        <Separator className="h-[2px] w-full max-w-[400px]" />
        <p className="text-xl">© 2024 WorkFlow</p>
      </div>
    </footer>
  );
}
