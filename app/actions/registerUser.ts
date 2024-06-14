"use server";

import { db } from "@/prisma/db";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

export async function registerUser({
  email,
  password,
  ...data
}: {
  email: string;
  surname: string;
  name: string;
  fathername: string;
  password: string;
  role: Role;
}) {
  const existUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existUser) throw new Error("Такой пользователь уже существует!");

  return await db.user.create({
    data: {
      ...data,
      email: email,
      password: await bcrypt.hash(password, 12),
    },
  });
}
