import type { Metadata } from "next"
import "./globals.css"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body>
        <div className="flex flex-col min-h-svh">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}