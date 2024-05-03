"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { BiEnvelope, BiLockAlt, BiUser } from "react-icons/bi"
import Link from "next/link"

const formSchema = z.object({
  login: z.string().email("Невалидный email!"),
  password: z.string().min(8, "Пароль должен быть не менее 8 сиволов!"),
})

export default function AuthPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <main className="container grid place-content-center py-4">
      <div className="rounded-lg shadow-md p-6 xs:px-12 xs:py-8 bg-background">
        <h1 className="text-4xl text-center mb-9">Войти</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Логин"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiEnvelope className="text-2xl text-muted-foreground" />
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
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*****"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiLockAlt className="text-2xl text-muted-foreground" />
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
              <Button type="submit">Войти</Button>
            </footer>
          </form>
        </Form>
      </div>
    </main>
  )
}
