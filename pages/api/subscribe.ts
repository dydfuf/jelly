import { NextApiRequest, NextApiResponse } from "next";
import { sendNotification } from "server/utils/webpush";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("==================");
    console.log("/subscript handler");
    const { subscription } = req.body;
    console.log({ subscription });

    try {
      console.log("before sendNotification");
      sendNotification({
        subscription,
        options: { title: "테스트에용", body: "테스트 입니다용" },
      });
      console.log("end sendNotification");
    } catch (error) {
      res.status(500).json({ message: "Failed to send subscription" });
    }
    res.status(200).json("good!");
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  console.log("==================");
}
