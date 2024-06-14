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
import { BiPencil } from "react-icons/bi";
import { Textarea } from "@/app/components/ui/textarea";
import { BiRuble } from "react-icons/bi";
import { FancyMultiSelect } from "@/app/components/fancy-multi-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder } from "@/app/actions/createOrder";
import { toast } from "sonner";
import { getTags } from "@/app/actions/getTags";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  title: z.string().min(1, "Это поле обязательно!"),
  price: z.number().positive().min(1, "Это поле обязательно!"),
  tags: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "Это поле обязательно!"),
  description: z.string().min(1, "Это полье обязательно!"),
});

export default function CreateOrderPage() {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      tags: [],
      description: "",
    },
  });

  const getTagsQuery = useQuery({
    queryKey: ["tags"],
    async queryFn() {
      return await getTags();
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
      toast.success("Новый заказ успешно создан!");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

   function onSubmit(values: z.infer<typeof formSchema>) {
     createOrderMutation.mutate({
      ...values,
      session: session!,
      tags: values.tags.map((tag) => tag.value),
    });
  }

  return (
    <main className="container grid place-content-center py-4">
      <div className="rounded-lg shadow-md p-6 xs:px-12 xs:py-8 bg-background sm:w-[600px] w-full">
        <h1 className="text-4xl text-center mb-9">Создание заказа</h1>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Название заказа"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiPencil className="text-xl text-muted-foreground" />
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
              name="tags"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Выберите теги</FormLabel>
                  <FormControl>
                    <FancyMultiSelect
                      placeholder="Выберите теги..."
                      value={value}
                      onValueChange={onChange}
                      options={
                        getTagsQuery.data?.map((tag) => ({
                          value: tag.id,
                          label: tag.label,
                        })) ?? []
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание заказа</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Придумайте описание заказа, которое полностью расскроет суть вашей идеи"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Укажите цену заказа"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiRuble className="text-xl text-muted-foreground" />
                      }
                      onChange={(event) => onChange(event.target.valueAsNumber)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <footer className="flex items-center justify-center gap-4">
              <Button type="submit">Создать заказ</Button>
            </footer>
          </form>
        </Form>
      </div>
    </main>
  );
}
