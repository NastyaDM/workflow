"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import {
  BiBook,
  BiBriefcase,
  BiCustomize,
  BiLogIn,
  BiUser,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type BurgerDrawerProps = {
  children: React.ReactNode;
};

export function BurderDrawer({ children }: BurgerDrawerProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [pathname]);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-full p-4" removeNotch>
        <div className="h-full flex flex-col justify-center gap-6">
          <Link href="/">
            <div className="flex items-center justify-center gap-1">
              <BiCustomize className="text-5xl" />
              <div className="flex flex-col leading-none text-lg">
                <Link href="/">
                  <span>WORK</span>
                  <span>FLOW</span>
                </Link>
              </div>
            </div>
          </Link>
          <nav className="flex flex-col gap-4">
            <Button variant="ghost" className="gap-2 text-lg" asChild>
              <Link href="/resume">
                <BiBriefcase />
                Резюме
              </Link>
            </Button>
            <Button variant="ghost" className="gap-2 text-lg" asChild>
              <Link href="/orders">
                <BiBook />
                Заказы
              </Link>
            </Button>
            <Button variant="ghost" className="gap-2 text-lg" asChild>
              {session?.user ? (
                <Link
                  href={
                    session.user.role === "Employer"
                      ? "/profile-employer"
                      : "/profile-performer"
                  }
                >
                  <BiUser />
                  Профиль
                </Link>
              ) : (
                <Link href="/login">
                  <BiLogIn />
                  Войти
                </Link>
              )}
            </Button>
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
