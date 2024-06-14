"use client";

import { ResumeItem } from "@/app/components/resume-item";
import { Button } from "@/app/components/ui/button";
import { BiSearch } from "react-icons/bi";
import { Input } from "@/app/components/ui/input";

import * as React from "react";
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

export default function OrdersPage() {
  const [selectValue, setSelectValue] =
    React.useState<SelectValueMap>("Alphabet");
  const [data, setData] = React.useState(null);

  return (
    <main>
      <section className="pt-8 pb-16 bg-gradient">
        <div className="container">
          <div className="text-center text-white mx-auto  mb-10">
            <h2 className="mb-4 text-4xl">Резюме</h2>
            <div className="max-w-[1400px] mx-auto">
              <Input
                type="text"
                className="pr-28 rounded-lg text-lg pl-14 h-16"
                placeholder="Поиск резюме..."
                leadingIcon={<BiSearch className="text-primary text-3xl" />}
                trailingBtn={<Button>Найти</Button>}
              />
            </div>
            <div className="flex justify-between mt-4">
              <p>Найдено результатов: 10</p>
              <div className="flex gap-6 items-center">
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
                    <PopoverContent>
                      <div className="flex flex-col gap-4">
                        {" "}
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Тэги</h4>
                          <p className="text-sm text-muted-foreground">
                            Вы можете выбрать несколько тэгов.
                          </p>
                        </div>
                        <div className="flex flex-col gap-3">
                          {" "}
                          <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Frontend
                            </label>
                          </div>{" "}
                          <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Frontend
                            </label>
                          </div>{" "}
                          <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Frontend
                            </label>
                          </div>
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
          <ResumeItem
              className="basis-[20rem]"
              title="Дизайнер"
              description="Дизайнер с опытом в создании уникальных цифровых продуктов, таких
        как веб-сайты, мобильные приложения и логотипы. Владею широким
        спектром инструментов и технологий, таких как Adobe Creative
        Suite, Sketch и Figma"
              tags={["Figma", "Photoshop"]}
              level="Middle"
              id="123"
            />
             <ResumeItem
              className="basis-[20rem]"
              title="Дизайнер"
              description="Дизайнер с опытом в создании уникальных цифровых продуктов, таких
        как веб-сайты, мобильные приложения и логотипы. Владею широким
        спектром инструментов и технологий, таких как Adobe Creative
        Suite, Sketch и Figma"
              tags={["Figma", "Photoshop"]}
              level="Middle"
              id="123"
            />
            <ResumeItem
              className="basis-[20rem]"
              title="Дизайнер"
              description="Дизайнер с опытом в создании уникальных цифровых продуктов, таких
        как веб-сайты, мобильные приложения и логотипы. Владею широким
        спектром инструментов и технологий, таких как Adobe Creative
        Suite, Sketch и Figma"
              tags={["Figma", "Photoshop"]}
              level="Middle"
              id="123"
            />
            <ResumeItem
              className="basis-[20rem]"
              title="Дизайнер"
              description="Дизайнер с опытом в создании уникальных цифровых продуктов, таких
        как веб-сайты, мобильные приложения и логотипы. Владею широким
        спектром инструментов и технологий, таких как Adobe Creative
        Suite, Sketch и Figma"
              tags={["Figma", "Photoshop"]}
              level="Middle"
              id="123"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
