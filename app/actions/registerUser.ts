"use server"

import { db } from "@/prisma/db"
import bcrypt from "bcrypt"

export async function registerUser(formData: FormData) {
  return await db.user.create({
    data: {
      surname: formData.get("surname") as string,
      name: formData.get("name") as string,
      fathername: formData.get("fathername") as string,
      login: formData.get("login") as string,
      password: await bcrypt.hash(formData.get("password") as string, 12),
    },
  })
}
