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

const formSchema = z
  .object({
    surname: z.string().min(1, "Обязательно поле!"),
    name: z.string().min(1, "Обязательно поле!"),
    fathername: z.string(),
    login: z.string().email("Невалидный email!"),
    password: z.string().min(8, "Пароль должен быть не менее 8 сиволов!"),
    confirmPassword: z.string().min(1, "Обязательное поле!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают!",
    path: ["confirmPassword"],
  })

export type RegisterFormSchema = z.infer<typeof formSchema>

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surname: "",
      name: "",
      fathername: "",
      login: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    const data = await res.json()
  }

  return (
    <main className="container grid place-content-center py-8">
      <div className="rounded-lg shadow-md p-6 xs:px-12 xs:py-8 bg-background">
        <h1 className="text-4xl text-center mb-9">Регистрация</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Фамилия*"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiUser className="text-2xl text-muted-foreground" />
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Имя*"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiUser className="text-2xl text-muted-foreground" />
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
              name="fathername"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Отчество"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiUser className="text-2xl text-muted-foreground" />
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
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Логин*"
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
                      placeholder="Придумайте пароль*"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Повторите пароль*"
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
            <p className="text-muted-foreground">
              * - обязательные поля для заполнения
            </p>
            <footer className="flex flex-col justify-center gap-4">
              <Button type="submit">Зарегистрироваться</Button>
              <Button asChild variant="link" type="button">
                <Link href="/login">Есть аккаунт?</Link>
              </Button>
            </footer>
          </form>
        </Form>
      </div>
    </main>
  )
}
