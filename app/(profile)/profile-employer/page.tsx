"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { ValueOf } from "@/lib/utils";
import { TbBallpen } from "react-icons/tb";
import { parseAsStringEnum, useQueryState } from "nuqs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";
import { BiEnvelope, BiLockAlt, BiUser } from "react-icons/bi";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { BiLogoVk } from "react-icons/bi";
import { BiLogoTelegram } from "react-icons/bi";
import { BiSolidPhone } from "react-icons/bi";
import { BiSolidEnvelope } from "react-icons/bi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OrderItem } from "@/app/components/order-item";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateProfile } from "@/app/actions/updateProfile";
import { toast } from "sonner";
import { updateContacts } from "@/app/actions/updateContacts";
import { getOrdersByAuthor } from "@/app/actions/getOrdersByAuthor";

const TabsMap = {
  Info: "Info",
  Contacts: "Contacts",
  Orders: "Orders",
} as const;

type TabsMap = ValueOf<typeof TabsMap>;

const TabsMapTriggerContent: Record<TabsMap, string> = {
  Info: "Информация",
  Contacts: "Контакты",
  Orders: "Заказы",
};

const formSchema = z.object({
  surname: z.string().min(1, "Обязательно поле!"),
  name: z.string().min(1, "Обязательно поле!"),
  fathername: z.string(),
  bio: z.string(),
});

const contactsFormSchema = z.object({
  vk: z.string().min(1, "Обязательно поле!"),
  telegram: z.string().min(1, "Обязательно поле!"),
  phone: z.string().min(1, "Обязательно поле!"),
  email: z.string().min(1, "Обязательно поле!"),
});

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isContactsEdit, setIsContactsEdit] = useState(false);
  const [tabs, setTabs] = useQueryState(
    "tab",
    parseAsStringEnum<TabsMap>(Object.values(TabsMap)) // pass a list of allowed values
      .withDefault(TabsMap.Info)
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surname: "",
      name: "",
      fathername: "",
      bio: "",
    },
  });

  const contactsForm = useForm<z.infer<typeof contactsFormSchema>>({
    resolver: zodResolver(contactsFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      telegram: "",
      vk: "",
    },
  });

  const createdOrdersQuery = useQuery({
    queryKey: ["createdOrders"],
    async queryFn() {
      return await getOrdersByAuthor({ id: session!.user.id });
    },
    enabled: !!session?.user,
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess(data) {
      toast.success("Профиль успешно обновлен!");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const updateContactsMutation = useMutation({
    mutationFn: updateContacts,
    onSuccess(data) {
      toast.success("Контакты успешно обновлены!");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateProfileMutation.mutate({ ...values, id: session!.user.id });
  }

  function onContactsSubmit(values: z.infer<typeof contactsFormSchema>) {
    updateContactsMutation.mutate({ ...values, id: session!.user.id });
  }

  useEffect(() => {
    if (session?.user) {
      form.setValue("surname", session.user.surname);
      form.setValue("name", session.user.name);
      form.setValue("fathername", session.user.fathername ?? "");
      form.setValue("bio", session.user.bio ?? "");
      contactsForm.setValue("email", session.user.email);
      contactsForm.setValue("vk", session.user.vk ?? "");
      contactsForm.setValue("telegram", session.user.telegram ?? "");
      contactsForm.setValue("phone", session.user.phone ?? "");
    }
  }, [session?.user, form, contactsForm]);

  return (
    <main className="overflow-hidden">
      <div className="h-[250px] w-full bg-gradient rounded-t-3xl"></div>
      <div className="max-w-[calc(1100px-2rem)] px-4 mx-auto -translate-y-24 flex flex-col gap-9">
        <div className="group relative w-fit overflow-hidden rounded-full">
          <Avatar className="relative w-[200px] h-[200px] text-2xl">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>
              {session?.user.surname.at(0)}
              {session?.user.name.at(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-foreground/50 grid place-items-center opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
            <TbBallpen className="text-4xl text-background" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl">
            {session?.user.surname} {session?.user.name}{" "}
            {session?.user.fathername}
          </h3>
          <p>{session?.user.bio !=="" ? session?.user.bio : "Описание отсутствует."}</p>
        </div>
        <Tabs value={tabs} onValueChange={(value) => setTabs(value as TabsMap)}>
          <TabsList className="bg-transparent flex p-0 h-auto justify-normal border-b border-muted-foreground rounded-none max-w-full overflow-auto">
            {Object.entries(TabsMapTriggerContent).map(([key, value]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-transparent py-2 shrink-0 text-base px-4 data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-foreground "
              >
                {value}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={TabsMap.Info}>
            <Form {...form}>
              <form
                className="space-y-4 max-w-[500px] mx-auto"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Фамилия"
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
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Имя"
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Описание профиля"
                          className="rounded-lg xs:min-w-[18.75rem]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <footer className="flex items-center justify-center gap-4">
                  <Button type="submit">Сохранить</Button>
                </footer>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value={TabsMap.Contacts}>
            <div>
              <header className="flex items-center justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    setIsContactsEdit((prev) => !prev);
                  }}
                >
                  Создать
                </Button>
              </header>
              {isContactsEdit ? (
                <Form {...contactsForm}>
                  <form
                    className="space-y-4 max-w-[500px] mx-auto"
                    onSubmit={contactsForm.handleSubmit(onContactsSubmit)}
                  >
                    <FormField
                      control={contactsForm.control}
                      name="vk"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="VK"
                              className="rounded-lg xs:min-w-[18.75rem]"
                              leadingIcon={
                                <BiLogoVk className="text-xl text-muted-foreground" />
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactsForm.control}
                      name="telegram"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Telegram"
                              className="rounded-lg xs:min-w-[18.75rem]"
                              leadingIcon={
                                <BiLogoTelegram className="text-xl text-muted-foreground" />
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactsForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Phone"
                              className="rounded-lg xs:min-w-[18.75rem]"
                              leadingIcon={
                                <BiSolidPhone className="text-xl text-muted-foreground" />
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactsForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email"
                              className="rounded-lg xs:min-w-[18.75rem]"
                              leadingIcon={
                                <BiSolidEnvelope className="text-xl text-muted-foreground" />
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <footer className="flex items-center justify-center gap-4">
                      <Button type="submit">Сохранить</Button>
                    </footer>
                  </form>
                </Form>
              ) : (
                <div className="flex flex-col max-w-xl gap-y-6 max-xl:order-1">
                  <div className="flex gap-6 justify-between pt-4">
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-6">
                        <span className="bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center text-3xl shrink-0">
                          <BiLogoVk />
                        </span>
                        <div>
                          <h5 className="text-xl font-medium">VK</h5>
                          {session?.user.vk ? (
                            <Link href={session.user.vk} target="_blank">
                              {session.user.vk}
                            </Link>
                          ) : (
                            <p>Не указан.</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <span className="bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                          <BiLogoTelegram className="text-3xl" />
                        </span>
                        <div>
                          <h5 className="text-xl font-medium">Telegram</h5>
                          {session?.user.telegram ? (
                            <Link href={session.user.telegram} target="_blank">
                              {session.user.telegram}
                            </Link>
                          ) : (
                            <p>Не указан.</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-6">
                        <span className="bg-primary text-primary-foreground flex items-center justify-center w-14 h-14 rounded-full shrink-0">
                          <BiSolidPhone className="text-3xl" />
                        </span>
                        <div>
                          <h5 className="text-xl font-medium">
                            Номер телефона
                          </h5>
                          {session?.user.phone ? (
                            <Link href={"tel:" + session.user.phone}>
                              {session.user.phone}
                            </Link>
                          ) : (
                            <p>Не указан.</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <span className="bg-primary text-primary-foreground flex items-center justify-center w-14 h-14 rounded-full shrink-0">
                          <BiSolidEnvelope className="text-3xl" />
                        </span>
                        <div>
                          <h5 className="text-xl font-medium">Адрес почты</h5>
                          {session?.user.email ? (
                            <Link href={"mailto:" + session.user.email}>
                              {session.user.email}
                            </Link>
                          ) : (
                            <p>Не указан.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value={TabsMap.Orders}>
            <div>
              <header className="flex items-center justify-end mb-2">
                <Button type="button" asChild>
                  <Link href={"create-order"}>Создать</Link>
                </Button>
              </header>
              <div className="flex flex-wrap items-center gap-4">
                {!createdOrdersQuery.isLoading ? (
                  createdOrdersQuery.data &&
                  createdOrdersQuery.data.length > 0 ? (
                    createdOrdersQuery.data?.map((order) => (
                      <OrderItem
                        key={order.id}
                        className="basis-[20rem] shadow bg-white"
                        title={order.title}
                        description={order.description}
                        tags={order.tags.map(({ tag }) => tag.label)}
                        price={order.price}
                        id={order.id}
                      />
                    ))
                  ) : (
                    <p>Нет результатов.</p>
                  )
                ) : (
                  <p>Загрузка...</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
