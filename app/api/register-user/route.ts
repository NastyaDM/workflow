import { RegisterFormSchema } from "@/app/(auth)/register/page"
import { db } from "@/prisma/db"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const { confirmPassword, ...data } =
    (await request.json()) as RegisterFormSchema

  const existUser = await db.user.findUnique({
    where: {
      login: data.login,
    },
  })

  if (existUser)
    return new Response("Такой пользователь уже существует!", { status: 400 })

  const newUser = await db.user.create({
    data: {
      ...data,
      password: await bcrypt.hash(data.password, 12),
    },
  })

  return Response.json(newUser)
}
