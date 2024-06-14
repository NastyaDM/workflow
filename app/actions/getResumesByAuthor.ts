"use server";

import { db } from "@/prisma/db";

export async function getResumesByAuthor({ id }: { id: string }) {
  return await db.resume.findMany({
    where: {
      authorId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              label: true,
            },
          },
        },
      },
    },
  });
}
