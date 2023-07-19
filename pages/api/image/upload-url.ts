import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "env.mjs";

const ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID;
const CF_TOKEN = env.CLOUDFLARE_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { count } = req.body;
  if (req.method === "POST") {
    const uploadUrls: string[] = [];

    for (const _ of new Array(count)) {
      const res = await axios(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v2/direct_upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CF_TOKEN}`,
          },
        }
      );
      uploadUrls.push(res.data.result.uploadURL);
    }

    return res.status(200).json({ uploadUrls });
  }
}
