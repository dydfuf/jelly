import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await prisma.user.findUnique({
    where: { id: req.query.userId as string },
  });

  if (!user) {
    res.status(404).json({ message: "user NotFound" });
    return;
  }

  if (req.method === "POST") {
    const { subscription } = req.body;
    const { endpoint } = subscription;

    const existSubscript = await prisma.pushSubscription.findMany({
      where: { endpoint },
    });

    if (existSubscript.length > 0) {
      res.status(200).json({ message: "이미 알림을 받고 있습니다." });
      return;
    }

    await prisma.pushSubscription.create({
      data: {
        userId: user?.id,
        subscription: JSON.stringify(subscription),
        endpoint,
      },
    });

    res.status(200).json({ message: "이제부터 알림을 받을 수 있습니다." });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  return;
}
