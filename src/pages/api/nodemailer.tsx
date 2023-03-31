import { Carts, CartsResult } from "@types";
import { NextApiResponse, NextApiRequest } from "next";
import nodemailer from "nodemailer";
import translator from "@configs/translatorMap";
import productMap from "@configs/productMap";
import dayjs from "dayjs";
import { changeNumberWithComma } from "src/utilities/funcs";

const dotenv = require("dotenv");

export type EmailRequest = {
  name: string;
  message: string;
  mobile: string;
  email: string;
};

export type EmailResponse = {
  error?: string;
  ok?: string;
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

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<EmailResponse>
) => {
  const { orderInfo, cartItems, summary } = req.body as CartsResult;

  const { name, email, phone } = orderInfo;
  const { totalPaymentPeso, totalPaymentWon } = summary;

  if (req.method !== "POST") {
    return res.status(404).send({ ok: "fail", error: "Begone." });
  }

  try {
    if (!name || !name.trim()) {
      throw new Error("Please provide a valid name.");
    }

    if (!email || !email.trim()) {
      throw new Error("Please provide a valid email address.");
    }

    if (!phone || !phone.trim()) {
      throw new Error("Please provide a valid phone.");
    }

    await transporter.sendMail({
      to: [
        "gkb10a@naver.com",
        // "junyounglim095@gmail.com",
        // "cheonsang4226@gmail.com",
        // "gkdud9194@gmail.com",
      ],
      //   to: email,
      from: OAUTH_USER,
      replyTo: email,
      subject: `${name} 님의 카카오트리 예약안내 메일입니다.`,
      html: `
      <div style="background-color: #E5E5E5;">
        <table align="center" border="0" cellspacing="0" cellpadding="0" style="padding: 0; margin: 0 auto; width: 95%;">
            <tbody>
            <br/>
            <br/>
            <tr>
                <td style="margin:0;padding:0">
                    <table align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: transparent;padding: 0; margin: 0 auto;max-width: 650px;border-radius: 8px;">
                        <tbody>
                            <tr style=" text-align: center;">
                                <td style="padding:0;margin:0;">
                                    <img height="60" src="https://user-images.githubusercontent.com/29701385/227183080-a81d46f5-c6a2-4c29-95db-4a3a76aa7bdf.png" loading="lazy">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr style="height:20px"></tr>
            
            <tr>
                <td>
                    <table align="center" border="0" cellspacing="0" cellpadding="0" style=" border: 1px solid #DDDFE2;font-size: 16px; border-top: 6px solid #b69e65; padding: 0 0 30px; margin: 0 auto;max-width: 650px;border-radius: 8px;background-color: #FFFFFF; width: 100%;">
                        <tbody>
                            <tr>
                                <td style="height: 24px; line-height: 24px;margin:0;padding:0">
                                    &nbsp;
                                </td>
                            </tr>
                            <tr style="text-align: center;">
                                <td>
                                    <img height="42" src="https://cdn6.agoda.net/images/postbooking/circle-check.png" loading="lazy">
                                </td>
                            </tr>
                            <tr style="text-align: center;">
                                <td style="padding:0;padding-left: 24px; padding-right: 24px; padding-top: 12px;font-size: 20px; font-weight: bold; color:#b69e65;">
                                    <p style="margin:0; padding:0">
                                        고객님의 예약서 작성이 완료되었습니다.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="height: 32px; line-height: 32px;margin:0;padding:0">
                                    &nbsp;
                                </td>
                            </tr>
                            <tr style="text-align: center;">
                                <td style="padding-left: 24px; padding-right: 24px;">
                                    <p style="margin:0; padding:0">
                                        고객님, 안녕하세요. 현재 예약 대기상태이며,
                                    </p>
                                    <br/>
                                    <P>
                                        작성해주신 연락처로 최대한 빠르게 연락드려 예약확정을 도와드리도록 하겠습니다.
                                    </P>
                                    <P>
                                        예약확정 연락이 오지 않거나, 빠른 처리를 원하시는 경우
                                    </P>
                                    <p>
                                        카카오톡 ID: cacaotreespa 로 연락주시면 더욱 더 빠르게 처리해드립니다.
                                    </p>
                                </td>
                            </tr>
                            <tr style="text-align: center;">
                                <td>
                                    <br/>
                                    <a href="https://pf.kakao.com/_mRQxbT/chat" style="font-size:16px;display:inline-block;background-color:#1c1d1e;color:#ffffff;text-decoration:none;outline:0px;text-align:center;padding:19px 20px;box-sizing:border-box;vertical-align:top;line-height:1" target="_blank" rel="noreferrer noopener">바로 문의하기</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="margin:0;padding:0;padding-top: 16px;">
                    <table align="center" border="0" cellspacing="0" cellpadding="0"  style="font-size: 14px; color: #2A2A2E; border: 1px solid #DDDFE2; padding: 0 24px 30px; margin: 0 auto;max-width: 650px;border-radius: 8px;background-color: #FFFFFF;">
                        <tbody>
                            <tr style="border-collapse:collapse;">
                                <td colspan="3" style="padding:0;margin:0;padding-top:24px;font-weight: bold; font-size: 18px; line-height: 21px;">
                                    기본 정보
                                </td>
                            </tr>
                            ${Object.keys(orderInfo)
                              .map((key) => {
                                return `
                                    <tr>
                                        <td colspan="1" style="width: 160px; padding: 16px 18px 10px 0; color: #737373; line-height: 25px; vertical-align: top;">
                                            ${translator[key]}
                                        </td>
                                        <td colspan="2" style="padding: 16px 0 10px 0; line-height: 25px; color: #2A2A2E; vertical-align: top;">
                                            ${orderInfo[key]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:602px;margin:0px;">
                                    </tr>
                                `;
                              })
                              .join("")}
                        </tbody>
                    </table>
                </td>
            </tr>
            ${cartItems
              .map((cartItem, idx) => {
                const { key, form } = cartItem;

                const { title, description, thumbnail } = productMap[key];

                const formHTML = Object.keys(form)
                  .map((key) => {
                    let value = form[key];
                    value =
                      key === "massageList"
                        ? value
                            .map(
                              (msg) =>
                                `${msg.massage.split("/")[0]} (${
                                  msg.sex === "f" ? "여" : "남"
                                })<br/>`
                            )
                            .join("")
                        : value;
                    value = ["pickTime", "massageTime"].includes(key)
                      ? dayjs(value).format("HH시 mm분")
                      : value;
                    value = ["date"].includes(key)
                      ? dayjs(form[key]).format("YYYY년 MM월 DD일")
                      : value;

                    return `
                          <tr>
                              <td colspan="1" style="width: 160px; padding: 16px 0px 10px 0; color: #737373; line-height: 25px; vertical-align: top;">
                                  ${translator[key]}
                              </td>
                              <td colspan="2" style="padding: 16px 0 10px 50px; line-height: 25px; color: #2A2A2E; vertical-align: top;">
                                  ${value}
                                  
                              </td>
                          </tr>
                          <tr>
                              <td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:602px;margin:0px;">
                          </tr>
                      `;
                  })
                  .join("");

                return `
                    <tr>
                        <td style="margin:0;padding:0;padding-top:16px">
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100% ;font-size: 14px; color: #2A2A2E; border: 1px solid #DDDFE2; padding: 0; margin: 0 auto;max-width: 650px;border-radius: 8px;background-color: #FFFFFF;">
                                <tbody>
                                    <tr>
                                        <td style="height: 24px; line-height: 24px;margin:0;padding:0">
                                            &nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0;Margin:0;padding-left: 24px; padding-right: 24px;">
                                            <span style="display: inline-block; font-size: 18px;">
                                            <strong>${`(${
                                              idx + 1
                                            }) ${title}`}</strong>
                                            </span>
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0;Margin:0;padding:12px 24px;">
                                            <table border="0" cellspacing="0" cellpadding="0" >
                                                <tbody>
                                                    <tr>
                                                        <td style="padding:0;Margin:0;padding-right: 8px; vertical-align: top;">
                                                            <img src="${thumbnail}" alt="alt" style="display:block;" width="130" loading="lazy">
                                                        </td>
                                                        <td style="padding:0;Margin:0;padding-left: 8px;vertical-align: top;">
                                                            <table border="0" cellspacing="0" cellpadding="0" >
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:0; margin:0; font-size: 14px;">
                                                                            <p style="margin:0;padding:0">
                                                                                ${description}
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding:0; margin:0; font-size: 14px; color:#737373;padding-top: 8px">
                                                                            <p style="margin:0;padding:0">
                                                                                카카오트리스파
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width:100%" colspan="2">
                                                            <table border="0" cellspacing="0" cellpadding="0" style="font-size:14px;width:100%;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td colspan="3" style="padding-top:20px;margin:0;font-weight: bold; font-size: 18px; line-height: 21px;">
                                                                            예약 세부 사항
                                                                        </td>
                                                                    </tr>
                                                                    ${formHTML}
                                                                    
                                                                    <tr>
                                                                        <td colspan="3" style="color: #737373; line-height: 20px; padding:0;padding-bottom:24px;">
                                                                            예약정보를 한번 더 확인해주세요.
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                `;
              })
              .join("")}
            <tr>
                <td style="padding:0;margin:0;padding-top: 16px;">
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100% ;font-size: 14px; color: #2A2A2E; border: 1px solid #DDDFE2; padding: 0 24px 30px; margin: 0 auto;max-width: 650px;border-radius: 8px;background-color: #FFFFFF;">
                        <tbody>
                            <tr>
                                <td colspan="2" style="padding: 24px 0 16px 0;font-weight: bold; font-size: 18px; line-height: 21px;">
                                    최종 금액
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0 18px 0 0; color: #737373; line-height: 25px; vertical-align: top; font-weight: bold;">
                                    페소지불(현장지불)
                                </td>
                                <td style="padding: 0 0 0 0; line-height: 25px; color: #2A2A2E; vertical-align: top; font-weight: bold; text-align: right;">
                                ${`${changeNumberWithComma(
                                  totalPaymentPeso
                                )} 페소`}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:100%;margin:0px;">
                            </tr>
                            <tr>
                                <td style="padding: 0 18px 0 0; color: #737373; line-height: 25px; vertical-align: top; font-weight: bold;">
                                    계좌이체
                                </td>
                                <td style="padding: 0 0 0 0; line-height: 25px; color: #2A2A2E; vertical-align: top; font-weight: bold; text-align: right;">
                                ${`${changeNumberWithComma(
                                  totalPaymentWon
                                )} 원`}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="margin: 0;padding: 0;padding-top: 16px;">
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="font-size: 14px; color: #2A2A2E; border: 1px solid #DDDFE2; padding: 0; margin: 0 auto;max-width: 650px;border-radius: 8px;background-color: #FFFFFF;">
                    <tbody>
                    <tr>
                        <td style="margin: 0;padding:0;padding-top:24px;padding-left:24px;padding-right: 24px;">
                            <p style="margin:0;padding:0;font-size:18px;font-weight:bold">
                                다른 상품이 궁금하신가요?
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="margin: 0;padding:0;padding-top:16px;padding-left:24px;padding-right: 24px;">
                            <p style="margin:0;padding:0;font-size:14px;">
                                아래 링크를 클릭하시면 카카오트리의 다른 패키지 상품들도 만나보실 수 있습니다.
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="margin: 0;padding:0; padding-top:16px;padding-left:24px;padding-right: 24px;">
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="padding: 0; margin: 0; background-color:#F4F8FE; border-radius: 4px;">
                            <tbody>
                            <tr>
                                <td align="center" style="margin: 0;padding:0;padding-top:16px;padding-bottom:16px;">
                                    <a style="margin:0;font-size:16px;color:#5392F9; text-decoration: none;" href="https://www.agoda.com/info/contact.html" target="_blank" rel="noreferrer noopener">
                                    홈페이지 바로가기 </a>
                                </td>
                            </tr>
                            </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0;margin:0;line-height:24px;">
                            &nbsp;
                        </td>
                    </tr>
                    </tbody>
                    </table>
                </td>
            </tr>
            <!-- Important notes info -->
            <tr>
                <td style="padding:0;margin:0;padding-top: 16px;">
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="font-size: 14px; color: #2A2A2E; border: 1px solid #DDDFE2; padding: 0; margin: 0 auto;max-width: 650px;border-radius: 8px;background-color: #FFFFFF;">
                    <tbody>
                    <tr>
                        <td colspan="2" style="padding: 24px 24px 8px 24px;font-weight: bold; font-size: 18px; line-height: 21px;">
                            필수 확인사항
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0 0 15px; color: #737373; line-height: 25px; vertical-align: top;font-weight: bold;">
                            •
                        </td>
                        <td style="padding: 8px 24px 0 16px;color: #737373; line-height: 25px; vertical-align: top;">
                            <font color="red">예약 확정:</font> 예약확정은 매니저와 카톡상담 후에 확정이 됩니다.
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0 0 15px; color: #737373; line-height: 25px; vertical-align: top;font-weight: bold;">
                            •
                        </td>
                        <td style="padding: 8px 24px 0 16px;color: #737373; line-height: 25px; vertical-align: top;">
                            <font color="red">환불 규정: </font> 7일 전: 전액환불 / 6일 ~ 당일: 환불, 날짜변경 불가
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0 0 15px; color: #737373; line-height: 25px; vertical-align: top;font-weight: bold;">
                            •
                        </td>
                        <td style="padding: 8px 24px 0 16px;color: #737373; line-height: 25px; vertical-align: top;">
                            항공 캔슬, 개인 사정, 단순 변심으로 인한 취소는 환불이 어렵습니다.
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0 0 15px; color: #737373; line-height: 25px; vertical-align: top;font-weight: bold;">
                            •
                        </td>
                        <td style="padding: 8px 24px 0 16px;color: #737373; line-height: 25px; vertical-align: top;">
                            노쇼는 환불이 불가능합니다.
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0 0 15px; color: #737373; line-height: 25px; vertical-align: top;font-weight: bold;">
                            •
                        </td>
                        <td style="padding: 8px 24px 0 16px;color: #737373; line-height: 25px; vertical-align: top;">
                            날씨로 인한 비행기 결항시, 전액 환불해드립니다.
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0;margin:0;line-height:24px;">
                            &nbsp;
                        </td>
                    </tr>
                    </tbody>
                    </table>
                </td>
            </tr>
            <!-- Download agoda app -->
            
            <tr style="text-align: center;">
                <td style="color:#999999;font-size:12px;line-height:19px;padding-top:36px;">
                    <p style="margin:0;">
                        Cacaotree Spa, Punta Engano Road, Lapu-lapu City, Cebu
                    </p>
                    <p style="margin:0;padding-top: 8px;">
                    카카오톡 ID : cacaotreespa
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="2"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:100%;margin:0px;">
            </tr>
            
            <tr style="text-align: center;">
                <td style="color:#999999;font-size:12px;line-height:19px;padding-top: 12px;">
                    <p style="margin:0;">
                        이메일: cacaotreespacebu@gmail.com
                    </p>
                </td>
            </tr>
            <tr style="text-align: center;">
                <td style="padding:0;margin:0;padding-top:36px;">
                    <img height=" 40" src="https://user-images.githubusercontent.com/29701385/227183080-a81d46f5-c6a2-4c29-95db-4a3a76aa7bdf.png" loading="lazy">
                </td>
            </tr>
            <tr>
                <td style="padding:0;margin:0;line-height:36px;">
                    &nbsp;
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    `,
    });

    res.status(200).send({ ok: "done", message: "message has been sent" });
  } catch (error) {
    res.status(500).send({ ok: "fail", error: `${error}` });
  }
};

export default handler;
