import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await prisma.user.findUnique({
    where: { id: req.query.userId as string },
  });

  res.status(200).json({ user });
}
