"use server";

import { db } from "@/prisma/db";
import { getServerSession, Session } from "next-auth";

export async function createOrder({
  tags,
  session,
  ...data
}: {
  title: string;
  price: number;
  tags: string[];
  description: string;
  session: Session;
}) {
  getServerSession();
  const newOrder = await db.order.create({
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

  return newOrder;
}
