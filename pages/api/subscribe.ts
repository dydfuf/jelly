import { NextApiRequest, NextApiResponse } from "next";
import { env } from "env.mjs";
import { saveSubscription } from "utils/saveSubscription";

const publicVapidKey = env.WEB_PUSH_PUBLIC_KEY;
const privateVapidKey = env.WEB_PUSH_PRIVATE_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const subscription = req.body;
    console.log("subscription");

    try {
      await saveSubscription(subscription);
      res.status(201).json({ message: "Subscription saved" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to save subscription" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
