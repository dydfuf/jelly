import { HttpStatusCode } from "axios";
import { format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import webpush from "web-push";

import { prisma } from "prisma/prisma";
import { sendNotification } from "server/utils/webpush";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  const groupId = req.query.groupId as string;

  if (req.method === "GET") {
    try {
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

      // 요청한 유저의 그룹이 아닌경우 return 한다.
      if (requestedUser?.groupId !== groupId) {
        return res.status(403).json("User Not in Requested Gruop");
      }

      const memories = await prisma.memory.findMany({
        where: {
          groupId: targetGruop.id,
        },
      });

      return res.status(200).json(memories);
    } catch (e) {
      return res.status(404).json("Memory Not Found");
    }
  }

  if (req.method === "POST") {
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

    // 요청한 유저의 그룹이 아닌경우 return 한다.
    if (requestedUser?.groupId !== groupId) {
      return res.status(403).json("User Not in Requested Gruop");
    }

    const { title, date, location, content, uploadedImageUrls } = req.body;
    // 요청의 body를 통해 memroy를만든다.
    const memroy = await prisma.memory.create({
      data: {
        title,
        date,
        location,
        content,
        uploadedImageUrls,
        groupId,
        userId,
      },
    });

    return res.status(200).json(memroy);
  }

  if (req.method === "PATCH") {
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

    // 요청한 유저의 그룹이 아닌경우 return 한다.
    if (requestedUser?.groupId !== groupId) {
      return res.status(403).json("User Not in Requested Gruop");
    }

    const { id, title, date, location, content, uploadedImageUrls } = req.body;
    const updatedMemory = await prisma.memory.update({
      where: {
        id,
      },
      data: { title, date, location, content, uploadedImageUrls },
    });

    // send notification
    // 1. 상대 유저의 userId를 가져옵니다.
    const _userToGroup = await prisma.userToGroup.findMany({
      where: { groupId: targetGruop.id },
    });
    const anotherUser = _userToGroup.filter(
      (userToGroup) => userToGroup.userId !== userId
    );

    console.log({ _userToGroup, anotherUser });

    // 2. 상대 유저의 userId를 가진 subscript을 가져옵니다.
    if (anotherUser) {
      const pushSubscription = await prisma.pushSubscription.findMany({
        where: {
          userId: anotherUser[0].userId,
        },
      });

      // 3. 해당 정보를 통해 sendnotification을 호출합니다.
      for (const subs of pushSubscription) {
        await sendNotification({
          subscription: JSON.parse(
            subs.subscription
          ) as unknown as webpush.PushSubscription,
          options: {
            title: "내사랑 젤리가 젤리에 글을 등록했어요! 🪼",
            body: `${format(
              new Date(date),
              "MM월 dd일"
            )}추억을 등록했어요!\n확인하러 가볼까요~?❤️`,
            url: `/memory/${format(new Date(date), "yyyy-MM-dd")}`,
          },
        });
      }
    }

    return res.status(200).json(updatedMemory);
  }

  return res.status(HttpStatusCode.MethodNotAllowed).json("Method Not Allowed");
}
