"use client";

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

const TabsMap = {
  Info: "Info",
  Contacts: "Contacts",
  Resume: "Resume",
} as const;

type TabsMap = ValueOf<typeof TabsMap>;

const TabsMapTriggerContent: Record<TabsMap, string> = {
  Info: "Информация",
  Contacts: "Контакты",
  Resume: "Резюме",
};

export default function ProfilePage() {
  const [tabs, setTabs] = useQueryState(
    "tab",
    parseAsStringEnum<TabsMap>(Object.values(TabsMap)) // pass a list of allowed values
      .withDefault(TabsMap.Info)
  );

  return (
    <main className="overflow-hidden">
      <div className="h-[250px] w-full bg-gradient rounded-t-3xl"></div>
      <div className="max-w-[calc(1000px-2rem)] px-4 mx-auto -translate-y-24 flex flex-col gap-9">
        <div className="group relative w-fit overflow-hidden rounded-full">
          <Avatar className="relative w-[200px] h-[200px] text-2xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-foreground/50 grid place-items-center opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
            <TbBallpen className="text-4xl text-background" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl">Иванов Иван Иванович</h3>
          <span>
            Дизайнер с опытом в создании уникальных цифровых продуктов, таких
            как веб-сайты, мобильные приложения и логотипы. Владею широким
            спектром инструментов и технологий, таких как Adobe Creative Suite,
            Sketch и Figma. Способен эффективно работать с командами
            разработчиков, менеджеров проектов и заказчиков, чтобы достичь общих
            целей. Готов делиться своими знаниями и опытом с коллегами и учиться
            новым вещам, что позволяет мне стремиться к становлению лучшим
            дизайнером.
          </span>
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
          <TabsContent value={TabsMap.Info}>Информация</TabsContent>
          <TabsContent value={TabsMap.Contacts}>Контакты</TabsContent>
          <TabsContent value={TabsMap.Resume}>Резюме</TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
