import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const client = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allJelly = await client.jelly.findMany()
  res.status(200).json({ status: "ok", data: allJelly })
}
