"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { BiEnvelope, BiLockAlt, BiUser } from "react-icons/bi";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Пароль должен быть не менее 8 сиволов!"),
});

export default function AuthPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await signIn("credentials", { ...values, redirect: false });

    if (res?.error) {
      toast.error(res.error);
    } else if (res?.ok) {
      toast.success("Авторизация прошла успешно!")
      router.push("/");
    }

    setIsLoading(false);
  }

  return (
    <main className="container grid place-content-center py-4">
      <div className="rounded-lg shadow-md p-6 xs:px-12 xs:py-8 bg-background">
        <h1 className="text-4xl text-center mb-9">Войти</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiEnvelope className="text-xl text-muted-foreground" />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*****"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiLockAlt className="text-xl text-muted-foreground" />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <footer className="flex items-center justify-between gap-4">
              <Button asChild variant="link">
                <Link href="/register">Нет аккаунта?</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>Войти</Button>
            </footer>
          </form>
        </Form>
      </div>
    </main>
  );
}
