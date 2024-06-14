"use server";

import { db } from "@/prisma/db";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

export async function registerUser(formData: FormData) {
  const existUser = await db.user.findUnique({
    where: {
      email: formData.get("email") as string,
    },
  });

  if (existUser) throw new Error("Такой пользователь уже существует!")

  return await db.user.create({
    data: {
      surname: formData.get("surname") as string,
      name: formData.get("name") as string,
      fathername: formData.get("fathername") as string,
      email: formData.get("email") as string,
      password: await bcrypt.hash(formData.get("password") as string, 12),
      role: formData.get("role") as Role
    },
  });
}
