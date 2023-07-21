import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json("User NotFound");
      }

      const userToGroup = await prisma.userToGroup.findUnique({
        where: {
          userId: userId,
        },
      });

      if (!userToGroup?.groupId) {
        return res.status(404).json("Group Not Found");
      }

      const groupCount = await prisma.userToGroup.count({
        where: {
          groupId: userToGroup.groupId,
        },
      });

      return res.status(200).json({ userToGroup, count: groupCount });
    } catch (e) {
      res.status(500).json("Find Group failed");
    }
  }
  if (req.method === "POST") {
    try {
      const userToGroupCount = await prisma.userToGroup.count({
        where: {
          userId,
        },
      });

      if (userToGroupCount > 0) {
        return res.status(200).json("Already have group");
      }

      const group = await prisma.group.create({ data: {} });
      await prisma.userToGroup.create({
        data: {
          userId,
          groupId: group.id,
        },
      });

      return res.status(200).json({ groupId: group.id });
    } catch (e) {
      return res.status(500).json("Create Group failed");
    }
  }
}
