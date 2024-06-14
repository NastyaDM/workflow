"use client";

import { ResumeItem } from "@/app/components/resume-item";
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
import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/app/actions/getTags";
import { useEffect, useMemo, useState } from "react";
import { getResumes } from "@/app/actions/getResumes";

const SelectValueMap = {
  Alphabet: "Alphabet",
  CreatedAt: "CreatedAt",
} as const;

type SelectValueMap = (typeof SelectValueMap)[keyof typeof SelectValueMap];

const SelectValueContentMap: Record<SelectValueMap, { label: string }> = {
  Alphabet: {
    label: "По алфвамиту",
  },
  CreatedAt: {
    label: "По дате",
  },
};

export default function ResumesPage() {
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

  const getResumesQuery = useQuery({
    queryKey: ["resumes"],
    async queryFn() {
      return await getResumes();
    },
  });

  const filteredResumes = useMemo(() => {
    const value = searchValue.toUpperCase().trim();

    return getResumesQuery.data
      ?.filter((resume) => {
        const special = resume.special.toUpperCase().trim().includes(value);
        const description = resume.description
          .toUpperCase()
          .trim()
          .includes(value);
        const tags = resume.tags
          .map(({ tag }) => tag.label.toUpperCase().trim())
          .includes(value);

        return special || description || tags;
      })
      .sort((a, b) => {
        if (selectValue === "Alphabet")
          return a.special.localeCompare(b.special);

        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .filter((resume) => {
        const activeFilters = filters
          .filter((filter) => filter.checked)
          .map((filter) => filter.label.toUpperCase().trim());

        if (activeFilters.length === 0) return true;

        const tags = resume.tags.map(({ tag }) =>
          tag.label.toUpperCase().trim()
        );

        return tags.some((tag) => activeFilters.includes(tag));
      });
  }, [getResumesQuery.data, searchValue, selectValue, filters]);

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
            <h2 className="mb-4 text-4xl">Резюме</h2>
            <div className="max-w-[1400px] mx-auto">
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                type="text"
                className="pr-28 rounded-lg text-lg text-black pl-14 h-16"
                placeholder="Поиск резюме..."
                leadingIcon={<BiSearch className="text-primary text-3xl" />}
                trailingBtn={<Button>Найти</Button>}
              />
            </div>
            <div className="flex flex-wrap justify-between mt-4">
              <p>Найдено результатов: {filteredResumes?.length}</p>
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
            {!getResumesQuery.isLoading ? (
              filteredResumes!.length > 0 ? (
                filteredResumes?.map((resume) => (
                  <ResumeItem
                    key={resume.id}
                    className="basis-[20rem]"
                    title={resume.special}
                    description={resume.description}
                    tags={resume.tags.map(({ tag }) => tag.label)}
                    level={resume.level}
                    id={resume.id}
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
