import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-svh">
      <Header className="!bg-transparent text-foreground" />
      {children}
      <Footer className="bg-primary text-primary-foreground rounded-t-3xl" />
    </div>
  );
}
