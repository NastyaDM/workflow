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
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { BiEnvelope, BiLockAlt, BiUser } from "react-icons/bi";
import Link from "next/link";
import { useRef, useState } from "react";
import { Role, User } from "@prisma/client";
import { toast } from "sonner";
import { Checkbox } from "@/app/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/app/actions/registerUser";

const formSchema = z
  .object({
    role: z.nativeEnum(Role),
    surname: z.string().min(1, "Обязательно поле!"),
    name: z.string().min(1, "Обязательно поле!"),
    fathername: z.string(),
    email: z.string().email("Невалидный email!"),
    password: z.string().min(8, "Пароль должен быть не менее 8 сиволов!"),
    confirmPassword: z.string().min(1, "Обязательное поле!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают!",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "Performer",
      surname: "",
      name: "",
      fathername: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess() {
      toast.success("Регистрация прошла успешно!");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirmPassword, ...data } = values;
    registerUserMutation.mutate(data);
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
              disabled={registerUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Фамилия*"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiUser className="text-xl text-muted-foreground" />
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
              disabled={registerUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Имя*"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiUser className="text-xl text-muted-foreground" />
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
              disabled={registerUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Отчество"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiUser className="text-xl text-muted-foreground" />
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
              name="email"
              disabled={registerUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email*"
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
              disabled={registerUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Придумайте пароль*"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              disabled={registerUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Повторите пароль*"
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
            <FormField
              control={form.control}
              name="role"
              disabled={registerUserMutation.isPending}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value === "Employer"}
                      onCheckedChange={(value) =>
                        field.onChange(value ? "Employer" : "Performer")
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormLabel>Я являюсь заказчиком.</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-muted-foreground">
              По умолчанию ваша роль - исполнитель
            </p>
            <p className="text-muted-foreground">
              * - обязательные поля для заполнения
            </p>
            <footer className="flex flex-col justify-center gap-4">
              <Button type="submit" disabled={registerUserMutation.isPending}>
                Зарегистрироваться
              </Button>
              <Button asChild variant="link" type="button">
                <Link href="/login">Есть аккаунт?</Link>
              </Button>
            </footer>
          </form>
        </Form>
      </div>
    </main>
  );
}
