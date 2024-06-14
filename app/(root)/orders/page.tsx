"use client";

import { OrderItem } from "@/app/components/order-item";
import { Button } from "@/app/components/ui/button";
import { BiSearch } from "react-icons/bi";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Checkbox } from "@/app/components/ui/checkbox";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/app/actions/getOrders";
import { getTags } from "@/app/actions/getTags";

const SelectValueMap = {
  Alphabet: "Alphabet",
  CreatedAt: "CreatedAt",
} as const;

type SelectValueMap = (typeof SelectValueMap)[keyof typeof SelectValueMap];

const SelectValueContentMap: Record<SelectValueMap, { label: string }> = {
  Alphabet: {
    label: "По алфавиту",
  },
  CreatedAt: {
    label: "По дате",
  },
};

export default function OrdersPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState<SelectValueMap>("CreatedAt");
  const [filters, setFilters] = useState<
    { id: string; label: string; checked: boolean }[]
  >([]);

  const getTagsQuery = useQuery({
    queryKey: ["tags"],
    async queryFn() {
      return await getTags();
    },
  });

  const getOrdersQuery = useQuery({
    queryKey: ["orders"],
    async queryFn() {
      return await getOrders();
    },
  });

  const filteredOrders = useMemo(() => {
    const value = searchValue.toUpperCase().trim();

    return getOrdersQuery.data
      ?.filter((order) => {
        const title = order.title.toUpperCase().trim().includes(value);
        const description = order.description
          .toUpperCase()
          .trim()
          .includes(value);
        const tags = order.tags
          .map(({ tag }) => tag.label.toUpperCase().trim())
          .includes(value);

        return title || description || tags;
      })
      .sort((a, b) => {
        if (selectValue === "Alphabet") return a.title.localeCompare(b.title);

        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .filter((order) => {
        const activeFilters = filters
          .filter((filter) => filter.checked)
          .map((filter) => filter.label.toUpperCase().trim());

        if (activeFilters.length === 0) return true;

        const tags = order.tags.map(({ tag }) =>
          tag.label.toUpperCase().trim()
        );

        return tags.some((tag) => activeFilters.includes(tag));
      });
  }, [getOrdersQuery.data, searchValue, selectValue, filters]);

  useEffect(() => {
    if (getTagsQuery.data) {
      setFilters(getTagsQuery.data.map((tag) => ({ ...tag, checked: false })));
    }
  }, [getTagsQuery.data]);

  return (
    <main>
      <section className="pt-8 pb-16 bg-gradient">
        <div className="container">
          <div className="text-center text-white mx-auto  mb-10">
            <h2 className="mb-4 text-4xl">Заказы</h2>
            <div className="max-w-[1400px] mx-auto">
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                type="text"
                className="pr-28 rounded-lg text-lg text-black pl-14 h-16"
                placeholder="Поиск заказов..."
                leadingIcon={<BiSearch className="text-primary text-3xl" />}
                trailingBtn={<Button>Найти</Button>}
              />
            </div>
            <div className="flex flex-wrap justify-between mt-4">
              <p>Найдено результатов: {filteredOrders?.length}</p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex gap-3 items-center">
                  <p>Сортировать по:</p>
                  <Select
                    value={selectValue}
                    onValueChange={(value) =>
                      setSelectValue(value as SelectValueMap)
                    }
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Выбрать" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Выбрать</SelectLabel>
                        {Object.entries(SelectValueContentMap).map(
                          ([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value.label}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3 items-center">
                  {" "}
                  <p>Фильтры</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="bg-transparent hover:bg-transparent hover:text-white font-normal h-9"
                        type="button"
                        variant="outline"
                      >
                        Выбрать
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="max-h-72 overflow-auto">
                      <div className="flex flex-col gap-4">
                        {" "}
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Тэги</h4>
                          <p className="text-sm text-muted-foreground">
                            Вы можете выбрать несколько тэгов.
                          </p>
                        </div>
                        <div className="flex flex-col gap-3">
                          {filters.map((filter) => (
                            <div
                              key={filter.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={filter.id}
                                checked={filter.checked}
                                onCheckedChange={(value) =>
                                  setFilters((prev) =>
                                    prev.map((f) => {
                                      if (f.id === filter.id) {
                                        return {
                                          ...f,
                                          checked: value as boolean,
                                        };
                                      }

                                      return f;
                                    })
                                  )
                                }
                              />
                              <label
                                htmlFor={filter.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {filter.label}
                              </label>
                            </div>
                          ))}
                        </div>
                        <Button type="submit">Сохранить</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {!getOrdersQuery.isLoading ? (
              filteredOrders!.length > 0 ? (
                filteredOrders?.map((order) => (
                  <OrderItem
                    key={order.id}
                    className="basis-[20rem]"
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
      </section>
    </main>
  );
}
