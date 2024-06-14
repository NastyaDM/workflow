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
import { BiDollar } from "react-icons/bi";
import { FancyMultiSelect } from "@/app/components/fancy-multi-select";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { Level } from "@prisma/client";
import { getTags } from "@/app/actions/getTags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createResume } from "@/app/actions/createResume";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  special: z.string().min(1, "Это поле обязательно!"),
  level: z.nativeEnum(Level),
  tags: z.array(z.object({ value: z.string(), label: z.string() })),
  description: z.string().min(1, "Это полье обязательно!"),
});

export default function CreateResumePage() {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      special: "",
      level: "Junior",
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

  const createResumeMutation = useMutation({
    mutationFn: createResume,
    onSuccess(data) {
      toast.success("Резюме успешно создано!");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createResumeMutation.mutate({
      ...values,
      session: session!,
      tags: values.tags.map((tag) => tag.value),
    });
  }

  return (
    <main className="container grid place-content-center py-4">
      <div className="rounded-lg shadow-md p-6 xs:px-12 xs:py-8 bg-background sm:w-[600px] w-full">
        <h1 className="text-4xl text-center mb-9">Создание резюме</h1>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="special"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ваша специализация"
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание резюме</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Придумайте описание вашего резюме, в котором будут указаны ваши сильные стороны"
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
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваш уровень</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <Button
                        asChild
                        variant="outline"
                        className="gap-2 bg-white justify-normal text-left h-11"
                      >
                        <SelectTrigger>
                          <BiBriefcaseAlt2 className="text-xl text-muted-foreground" />
                          <p className="flex-1">
                            <SelectValue placeholder="Укажите ваш уровень подготовки" />
                          </p>
                        </SelectTrigger>
                      </Button>
                      <SelectContent>
                        {Object.entries(Level).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* <Input
                      type="text"
                      placeholder="Укажите ваш уровень подготовки"
                      className="rounded-lg xs:min-w-[18.75rem]"
                      leadingIcon={
                        <BiBriefcaseAlt2 className="text-xl text-muted-foreground" />
                      }
                      {...field}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <footer className="flex items-center justify-center gap-4">
              <Button type="submit">Создать резюме</Button>
            </footer>
          </form>
        </Form>
      </div>
    </main>
  );
}
