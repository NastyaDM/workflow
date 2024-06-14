import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { Level } from "@prisma/client";

type ResumeItemProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  level: Level;
} & React.ComponentProps<"article">;

export function ResumeItem({
  id,
  title,
  description,
  tags,
  level,
  className,
  ...props
}: ResumeItemProps): React.ReactNode {
  return (
    <article
      className={cn(
        "p-6 bg-background rounded-xl flex flex-col w-[20rem] h-[19.875rem]",
        className
      )}
      {...props}
    >
      <h4 className="text-xl font-medium mb-4">{title}</h4>
      {tags.length > 0 ? (
        <div className="flex items-center mb-2 custom-scrollbar overflow-auto gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 text-warning w-fit before:content-[''] before:shrink-0 whitespace-nowrap before:block before:w-[5px] before:h-[5px] before:bg-warning before:rounded-full"
            >
              <p>{tag}</p>
            </div>
          ))}
        </div>
      ) : null}
      <span className="mb-4 line-clamp-4">{description}</span>
      <hr className="py-[0.5px] bg-black/10 mt-auto" />
      <div className="flex items-center justify-between pt-4">
        <p className="text-2xl font-medium text-primary">{level}</p>
        <Button asChild>
          <Link
            href="#"
            className="flex px-4 py-2 text-white rounded-lg gap-x-2 bg-primary"
          >
            Написать
          </Link>
        </Button>
      </div>
    </article>
  );
}
