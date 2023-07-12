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
  if (req.method === "PUT") {
    const groupId = req.body.groupId;
    try {
      // 유저가 요청한 target group이 유효한지 확인한다.
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

      if (requestedUser) {
        // 요청한 유저가 속한 gruop에 몇명 이 있는지 확인한다.
        const requestedUserParticipantGruopUserCount =
          await client.userToGroup.count({
            where: {
              groupId: requestedUser?.groupId,
            },
          });

        // 요청한 유저가 속한 gruop에 2명 이상이 있다면 이미 gruop이 있는 경우이다.
        if (requestedUserParticipantGruopUserCount >= 2) {
          return res.status(200).json("You Already have group");
        }
      }

      // 유저가 참여하고자 하는 gruop에 유저가 몇 명이 있는지 확인한다.
      const targetGruopUserCount = await client.userToGroup.findMany({
        where: {
          groupId,
        },
      });

      // 유저가 참여하고자 하는 gruop에 2명 이상이 있다면 이미 그룹이 가득차있는 것이다.
      if (targetGruopUserCount.length >= 2) {
        return res.status(200).json("This group is full");
      }

      // 유저가 이미 그룹이 있다면, 즉 이미 그룹을 만들었으나 누군가 참여하지 않은경우. 본인이 속한 그룹을 삭제한다.
      if (requestedUser) {
        await client.$transaction([
          client.userToGroup.delete({
            where: {
              userId: userId,
            },
          }),
          client.group.delete({
            where: {
              id: requestedUser.groupId,
            },
          }),
        ]);
      }

      // 기존의 그룹에 참여한다.
      const newUserToGroupCount = await client.userToGroup.create({
        data: {
          userId,
          groupId,
        },
      });

      // 만들어지고나서 다음 페이지로 넘어가야 한다.
      return res.status(200).json({ newUserToGroupCount });
    } catch (e) {
      return res.status(500).json("Create Group failed");
    }
  }
}
