"use server";

import { db } from "@/prisma/db";

export async function updateProfile({
  id,
  ...data
}: {
  id: string;
  surname: string;
  name: string;
  fathername?: string;
  bio?: string;
}) {
  return await db.user.update({
    where: {
      id,
    },
    data,
  });
}
