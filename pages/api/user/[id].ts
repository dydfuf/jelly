import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await client.user.findUnique({
    where: { id: req.query.id as string },
  });

  res.status(200).json({ user });
}
