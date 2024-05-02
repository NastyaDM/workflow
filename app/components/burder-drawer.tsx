"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer"
import { BiCustomize } from "react-icons/bi"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

type BurgerDrawerProps = {
  children: React.ReactNode
}

export function BurderDrawer({ children }: BurgerDrawerProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) setIsOpen(false)
  }, [pathname])

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-full p-4" removeNotch>
        <div className="h-full flex flex-col justify-center gap-6">
          <Link href="/">
            <div className="flex items-center justify-center gap-1">
              <BiCustomize className="text-5xl" />
              <div className="flex flex-col leading-none text-lg">
                <span>WORK</span>
                <span>FLOW</span>
              </div>
            </div>
          </Link>
          <nav className="flex flex-col gap-4">
            <Button asChild>
              <Link href="/">Резюме</Link>
            </Button>
            <Button asChild>
              <Link href="/">Заказы</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Войти</Link>
            </Button>
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
