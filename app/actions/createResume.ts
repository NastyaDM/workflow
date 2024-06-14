"use server";

import { db } from "@/prisma/db";
import { Level } from "@prisma/client";
import { Session } from "next-auth";

export async function createResume({
  tags,
  session,
  ...data
}: {
  special: string;
  tags: string[];
  description: string;
  level: Level;
  session: Session;
}) {
  const newResume = await db.resume.create({
    data: {
      ...data,
      authorId: session.user.id,
      tags: {
        createMany: {
          data: tags.map((tag) => ({ tagId: tag })),
        },
      },
    },
  });

  return newResume;
}
