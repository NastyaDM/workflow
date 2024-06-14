"use server";

import { db } from "@/prisma/db";

export async function updateContacts({
  id,
  ...data
}: {
  id: string;
  vk: string;
  telegram: string;
  email: string;
  phone: string;
}) {
  return await db.user.update({
    where: {
      id,
    },
    data: data,
  });
}
