"use server";

import { db } from "@/prisma/db";

export async function getOrders() {
  return await db.order.findMany({
    orderBy: {
        createdAt: "desc"
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
