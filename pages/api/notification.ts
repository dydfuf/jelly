import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import webpush from "web-push";

import { prisma } from "prisma/prisma";
import { sendNotification } from "server/utils/webpush";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const pushSubscription = await prisma.pushSubscription.findMany();

    // 3. 해당 정보를 통해 sendnotification을 호출합니다.
    for (const subs of pushSubscription) {
      console.log("subs start : ", subs.id);
      try {
        await sendNotification({
          subscription: JSON.parse(
            subs.subscription
          ) as unknown as webpush.PushSubscription,
          options: {
            title: "오늘 젤리에 글 쓰셨나요?",
            body: `또 까먹었지!?`,
          },
        });
      } catch (e) {
        console.log("subs error : ", subs.id);
      }
    }

    return res.status(200).json({ status: "ok" });
  }

  return res.status(HttpStatusCode.MethodNotAllowed).json("Method Not Allowed");
}
