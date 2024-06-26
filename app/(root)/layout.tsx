import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-svh">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
