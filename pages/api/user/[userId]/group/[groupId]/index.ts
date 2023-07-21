import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  const groupId = req.query.groupId as string;

  if (req.method === "PUT") {
    try {
      // 유저가 요청한 target group이 유효한지 확인한다.
      const targetGruop = await prisma.group.findUnique({
        where: {
          id: groupId,
        },
      });

      // targetGroup이 없다면 return 한다.
      if (targetGruop === null) {
        return res.status(404).json("해당 gruop을 찾을 수 없습니다.");
      }

      // 요청한 유저가 속한 gruop을 가져온다.
      const requestedUser = await prisma.userToGroup.findUnique({
        where: {
          userId,
        },
      });

      if (requestedUser) {
        // 요청한 유저가 속한 gruop에 몇명 이 있는지 확인한다.
        const requestedUserParticipantGruopUserCount =
          await prisma.userToGroup.count({
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
      const targetGruopUserCount = await prisma.userToGroup.findMany({
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
        await prisma.$transaction([
          prisma.userToGroup.delete({
            where: {
              userId: userId,
            },
          }),
          prisma.group.delete({
            where: {
              id: requestedUser.groupId,
            },
          }),
        ]);
      }

      // 기존의 그룹에 참여한다.
      const newUserToGroupCount = await prisma.userToGroup.create({
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
