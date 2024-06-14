"use server";

import { db } from "@/prisma/db";

export async function getResumes() {
  return await db.resume.findMany({
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
