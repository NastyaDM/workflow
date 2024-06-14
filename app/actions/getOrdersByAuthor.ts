"use server";

import { db } from "@/prisma/db";

export async function getOrdersByAuthor({ id }: { id: string }) {
  return await db.order.findMany({
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
