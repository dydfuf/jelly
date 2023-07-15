import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  if (req.method === "GET") {
    try {
      const user = await client.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json("User NotFound");
      }

      const userToGroup = await client.userToGroup.findUnique({
        where: {
          userId: userId,
        },
      });

      if (!userToGroup?.groupId) {
        return res.status(404).json("Group Not Found");
      }

      const groupCount = await client.userToGroup.count({
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
      const userToGroupCount = await client.userToGroup.count({
        where: {
          userId,
        },
      });

      if (userToGroupCount > 0) {
        return res.status(200).json("Already have group");
      }

      const group = await client.group.create({ data: {} });
      await client.userToGroup.create({
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
