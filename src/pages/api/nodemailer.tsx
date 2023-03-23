import { NextApiResponse, NextApiRequest } from "next";
import nodemailer from "nodemailer";
const dotenv = require("dotenv");

type Fields = {
  name: string;
  message: string;
  mobile: string;
  email: string;
};

type Response = {
  error?: string;
  status?: string;
  message?: string;
};

dotenv.config();

const {
  OAUTH_USER,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
} = process.env;

if (
  !OAUTH_USER ||
  !OAUTH_CLIENT_ID ||
  !OAUTH_CLIENT_SECRET ||
  !OAUTH_REFRESH_TOKEN
) {
  throw Error("OAuth 인증에 필요한 환경변수가 없습니다.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.google.com",
  port: 587,
  secure: true,
  auth: {
    type: "OAuth2",
    user: OAUTH_USER,
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { name, email, message } = req.body as Fields;

  if (req.method !== "POST") {
    return res.status(404).send({ status: "fail", error: "Begone." });
  }

  try {
    if (!name || !name.trim()) {
      throw new Error("Please provide a valid name.");
    }

    if (!email || !email.trim()) {
      throw new Error("Please provide a valid email address.");
    }

    if (!message || !message.trim()) {
      throw new Error("Please provide a valid email message.");
    }

    await transporter.sendMail({
      to: "gkb10a@naver.com",
      from: OAUTH_USER,
      replyTo: email,
      subject: "Nodemailer X Gmail OAuth 2.0 테스트",
      html: `
      <h1>
        Nodemailer X Gmail OAuth 2.0 테스트 메일
      </h1>
      <hr />
      <br />
      <p>축하하네, 구도자여!<p/>
      <p>자네는 모든 시련과 역경을 이겨냈네. 하산하시게나!</p>
      <br />
      <hr />
      <p>이 메일은 Gmail API를 써보고 싶은 정신나간 개발자에 의해서 발송되었습니다.</p>
      <p>이 메일을 요청한 적이 없으시다면 무시하시기 바랍니다.</p>
    `,
    });

    res.status(200).send({ status: "done", message: "message has been sent" });
  } catch (error) {
    res.status(500).send({ status: "fail", error: `${error}` });
  }
};

export default handler;
