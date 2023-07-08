import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const user = await client.user.findUnique({
        where: {
          id: req.query.id as string,
        },
      });

      if (!user) {
        return res.status(404).json("User NotFound");
      }

      const accountToGroup = await client.accountToGroup.findUnique({
        where: {
          userId: req.query.id as string,
        },
      });

      if (!accountToGroup?.groupId) {
        return res.status(404).json("Group Not Found");
      }

      return res.status(200).json(accountToGroup.groupId);
    } catch (e) {
      res.status(500).json("Generate Hashcode failed");
    }
  }
}
