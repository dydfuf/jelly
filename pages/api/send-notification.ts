import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";
import { getSubscriptions } from "utils/saveSubscription";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const subscriptions = getSubscriptions();
    const notificationPayload = {
      title: "Hello from PWA",
      body: "This is a test push notification",
    };

    try {
      console.log(notificationPayload);

      const VAPID = {
        publicKey: process.env.WEB_PUSH_PUBLIC_KEY!,
        privateKey: process.env.WEB_PUSH_PRIVATE_KEY!,
      };

      for (const subscription of subscriptions) {
        const parsedUrl = new URL(subscription.endpoint);
        const audience = `${parsedUrl.protocol}//${parsedUrl.hostname}`;

        const vapidHeaders = webPush.getVapidHeaders(
          audience,
          "mailto: 88dydfuf@naver.com",
          VAPID.publicKey,
          VAPID.privateKey,
          "aes128gcm"
        );

        await webPush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload),
          {
            headers: vapidHeaders,
          }
        );
      }

      res.status(200).json({ message: "Push notifications sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send push notifications" });
    }
  }
}
