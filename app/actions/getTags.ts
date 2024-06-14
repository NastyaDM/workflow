"use server";

import { db } from "@/prisma/db";

export async function getTags() {
  return await db.tag.findMany();
}
