import Link from "next/link"
import { BurderDrawer } from "./burder-drawer"
import { Button } from "./ui/button"
import { BiCustomize, BiMenu } from "react-icons/bi"
import React from "react"
import { cn } from "@/lib/utils"

type HeaderProps = React.ComponentProps<"header">

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky z-50 top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        className
      )}
      {...props}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-1">
              <BiCustomize className="text-3xl" />
              <div className="flex flex-col leading-none text-lg">
                <span>WORK</span>
                <span>FLOW</span>
              </div>
            </div>
          </Link>
          <div className="space-x-10 max-md:hidden text-lg">
            <Link href="/resume" className="">
              Резюме
            </Link>
            <Link href="/orders">Заказы</Link>
          </div>
          <div className="text-lg max-md:hidden">
            <Link href="/login">Войти</Link>
          </div>
          <BurderDrawer>
            <Button variant="ghost" size="icon" className="md:hidden">
              <BiMenu className="text-3xl" />
            </Button>
          </BurderDrawer>
        </div>
      </div>
    </header>
  )
}
