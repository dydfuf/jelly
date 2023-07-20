import { PrismaClient } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  const groupId = req.query.groupId as string;

  if (req.method === "GET") {
    try {
      const targetGruop = await client.group.findUnique({
        where: {
          id: groupId,
        },
      });

      // targetGroup이 없다면 return 한다.
      if (targetGruop === null) {
        return res.status(404).json("해당 gruop을 찾을 수 없습니다.");
      }

      // 요청한 유저가 속한 gruop을 가져온다.
      const requestedUser = await client.userToGroup.findUnique({
        where: {
          userId,
        },
      });

      // 요청한 유저의 그룹이 아닌경우 return 한다.
      if (requestedUser?.groupId !== groupId) {
        return res.status(403).json("User Not in Requested Gruop");
      }

      const plans = await client.plan.findMany({
        where: {
          groupId: targetGruop.id,
        },
      });

      return res.status(200).json(plans);
    } catch (e) {
      return res.status(404).json("Plan Not Found");
    }
  }

  if (req.method === "POST") {
    const targetGruop = await client.group.findUnique({
      where: {
        id: groupId,
      },
    });

    // targetGroup이 없다면 return 한다.
    if (targetGruop === null) {
      return res.status(404).json("해당 gruop을 찾을 수 없습니다.");
    }

    // 요청한 유저가 속한 gruop을 가져온다.
    const requestedUser = await client.userToGroup.findUnique({
      where: {
        userId,
      },
    });

    // 요청한 유저의 그룹이 아닌경우 return 한다.
    if (requestedUser?.groupId !== groupId) {
      return res.status(403).json("User Not in Requested Gruop");
    }

    const { title, isUndecided, startDate, endDate, content } = req.body;
    // 요청의 body를 통해 memroy를만든다.
    const plan = await client.plan.create({
      data: {
        title,
        isUndecided,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        content,
        groupId,
        userId,
      },
    });

    return res.status(200).json(plan);
  }

  return res.status(HttpStatusCode.MethodNotAllowed).json("Method Not Allowed");
}
