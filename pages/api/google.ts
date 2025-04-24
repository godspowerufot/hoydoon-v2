/* eslint-disable */
import { OAuth2Client } from 'google-auth-library';
import type { NextApiRequest, NextApiResponse } from 'next';

const oAuth2Client = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.NEXT_GOOGLE_CLIENT_SECRET,
  'postmessage'
);

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | any>
  // use `any` to allow token response
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).json({ message: "No code provided" });
    }

    const { tokens } = await oAuth2Client.getToken(code);
    return res.status(200).json(tokens); // return 200 for success
  } catch (err: any) {
    console.error("Token exchange error:", err.message || err);
    return res
      .status(500)
      .json({ message: "Internal error", error: err.message });
  }
}
