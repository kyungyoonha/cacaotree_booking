import nodemailer from "nodemailer";
const dotenv = require("dotenv");

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
  console.log(`OAUTH_USER: ${!!OAUTH_USER} `);
  console.log(`OAUTH_CLIENT_ID: ${!!OAUTH_CLIENT_ID} `);
  console.log(`OAUTH_CLIENT_SECRET: ${!!OAUTH_CLIENT_SECRET} `);
  console.log(`OAUTH_REFRESH_TOKEN: ${!!OAUTH_REFRESH_TOKEN} `);
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

export default transporter;
