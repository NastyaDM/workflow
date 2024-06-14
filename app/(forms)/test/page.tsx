import { db } from "@/prisma/db";

export default async function TestPage() {
  const tags = await db.tag.findMany();

  console.log(tags);

  return <div>TestPage <pre>{JSON.stringify(tags)}</pre></div>;
}
