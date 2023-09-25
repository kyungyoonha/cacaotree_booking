import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import transporter from "src/libs/nodemailer";
import translator from "@configs/translatorMap";
import { changeTimeFormat } from "src/utilities/funcs";
import axios from "axios";

const { GoogleSpreadsheet } = require("google-spreadsheet");

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).send({ ok: "fail", error: "Begone." });
  }

  let {
    date,
    pickTime,
    pickLocation,
    massageList,
    massageTime,
    dropLocation,
    dropLocation_hidden,
    dropTime,
    couponList,
    email,
    ...formWithoutExcept
  } = req.body;

  let result = {};
  let massageEng = [];
  let massageKor = [];
  let paymentWon = 0;

  massageList.forEach((massageItem, idx) => {
    if (!massageItem?.massage) return;
    const { massage, sex } = massageItem;
    const massagePrice = Number(massageItem.massage.split("/")[2]);
    const afterText = massageList.length === idx + 1 ? "" : " / ";
    const sexKor = sex.replace("f", "여").replace("m", "남");
    paymentWon += massagePrice;
    massageEng.push(`${massage.split("/")[1]} (${sex})${afterText}`);
    massageKor.push(`${massage.split("/")[0]} (${sexKor})`);
  });

  if (!isNaN(Date.parse(pickTime))) {
    pickTime = dayjs(pickTime).format("hh:mm A");
  }

  date = dayjs(date).format("YYYY. MM. DD");
  //   massageTime = dayjs(massageTime).format("hh:mm A");
  dropLocation = dropLocation
    .replace("필요 없습니다.", "No Need")
    .replace("개별적으로 이동하겠습니다.", "Drop No Need");

  let confirmInfo =
    "[일반 패키지]\n" +
    `◆ 고객성함: ${req.body.name}\n` +
    `◆ 총인원수: ${req.body.pax}명\n` +
    `◆ 예약날짜: ${date}\n` +
    `◆ 픽업시간: ${pickTime}\n` +
    `◆ 픽업장소: ${pickLocation}\n` +
    `◆ 마사지예약: ${massageTime}\n` +
    `◆ 드랍장소: ${req.body.dropLocation}\n` +
    `◆ 마사지: ${massageKor.join(`\n`)}\n` +
    `◆ 참고사항: ${req.body.memo}`;

  let msg =
    "♡♥안녕하세요. 고객님♡♥\n" +
    "카카오트라 스파 입니다.\n" +
    '홈페이지 통해 예약주신 "일반팩" 예약 확인이 되었습니다. 아래정보가 맞는지 한번 더 확인해 주세요.\n\n' +
    `${confirmInfo}\n\n\n` +
    `★차량정보는 당일 또는 전날에 안내 드리겠습니다★`;

  Object.keys(formWithoutExcept).forEach((key) => {
    result[key] = formWithoutExcept[key];
  });

  result["company"] = "미확정";
  result["confirmDone"] = "N";
  result["paid"] = "N";
  //   result["paymentWon"] = paymentWon;
  result["massage"] = massageEng.join("");
  result["date"] = "입금전/" + date;
  result["pickTime"] = changeTimeFormat(pickTime);
  result["pickLocation"] = pickLocation;
  result["massageTime"] = changeTimeFormat(massageTime);
  result["dropLocation"] = dropLocation;
  result["dropTime"] = changeTimeFormat(dropTime);
  result["confirmInfo"] = confirmInfo;

  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    });
    await doc.getInfo();
    let sheet = doc.sheetsByTitle["Booking"];
    await sheet.loadHeaderRow(1);
    sheet.addRow(result);

    await axios.post("http://221.139.14.189/API/friendstalk_send", {
      api_key: process.env.KAKAO_API_KEY,
      msg: msg,
      plusfriend: "@cacaotreespa",
      callback: "01083438231",
      dstaddr: "01092066598",
      send_reserve: "0",
      button_type: "0",
      next_type: "1",
    });

    await transporter.sendMail({
      to: [
        "gkb10a@gmail.com",
        "cheonsang4226@gmail.com",
        "gkdud9194@gmail.com",
        "pheobe0630@gmail.com",
        email,
      ],
      from: "cacaotreespacebu@gmail.com",
      replyTo: email,
      subject: `${req.body.name} 님의 카카오트리 예약안내 메일입니다.`,
      html: `
      <div style="background-color: #E5E5E5;">
        <table align="center" border="0" cellspacing="0" cellpadding="0" style="padding: 0; margin: 0 auto; width: 95%;">
            <tbody><br/><br/>
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
                                        예약해주셔서 감사합니다.
                                    </p>
                                    <br/>
                                    <P>
                                        고객님의 예약은 현재 대기상태이며,
                                    </P>
                                    <P>
                                        예약 확인 및 확정 안내는 24시간 내로 카카오톡으로 안내 연락이 갈겁니다.
                                    </P>
                                    <p>
                                        이용해 주셔서 감사합니다 ^^
                                    </p>
                                </td>
                            </tr>
                            <tr style="text-align: center;">
                                <td>
                                    <br/>
                                    <a href="https://pf.kakao.com/_mRQxbT/chat" style="font-size:16px;display:inline-block;background-color:#1c1d1e;color:#ffffff;text-decoration:none;outline:0px;text-align:center;padding:14px 30px;box-sizing:border-box;vertical-align:top;line-height:1" target="_blank" rel="noreferrer noopener">바로 문의하기</a>
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
                            <tr style="border-collapse:collapse;"><td colspan="3" style="padding:0;margin:0;padding-top:24px;font-weight: bold; font-size: 18px; line-height: 21px;">일반 패키지 마사지</td></tr>
                            ${["name", "email", "phone", "pax"]
                              .map((key) => {
                                return `
                                    <tr>
                                        <td colspan="1" style="width: 160px; padding: 16px 18px 10px 0; color: #737373; line-height: 25px; vertical-align: top;">
                                            ${translator[key]}
                                        </td>
                                        <td colspan="2" style="padding: 16px 0 10px 0; line-height: 25px; color: #2A2A2E; vertical-align: top;">
                                            ${req.body[key]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:602px;margin:0px;">
                                    </tr>
                                `;
                              })
                              .join("")}
                              <tr>
                                  <td colspan="1" style="width: 160px; padding: 16px 18px 10px 0; color: #737373; line-height: 25px; vertical-align: top;">예약날짜</td>
                                  <td colspan="2" style="padding: 16px 0 10px 0; line-height: 25px; color: #2A2A2E; vertical-align: top;">${date}</td>
                              </tr>
                              <tr><td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:602px;margin:0px;"></tr>
                              <tr>
                                  <td colspan="1" style="width: 160px; padding: 16px 18px 10px 0; color: #737373; line-height: 25px; vertical-align: top;">픽업시간</td>
                                  <td colspan="2" style="padding: 16px 0 10px 0; line-height: 25px; color: #2A2A2E; vertical-align: top;">${pickTime}</td>
                              </tr>
                              <tr><td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:602px;margin:0px;"></tr>
                              <tr>
                                  <td colspan="1" style="width: 160px; padding: 16px 18px 10px 0; color: #737373; line-height: 25px; vertical-align: top;">픽업장소</td>
                                  <td colspan="2" style="padding: 16px 0 10px 0; line-height: 25px; color: #2A2A2E; vertical-align: top;">${pickLocation}</td>
                              </tr>
                              <tr><td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:602px;margin:0px;"></tr>
                              <tr>
                                  <td colspan="1" style="width: 160px; padding: 16px 18px 10px 0; color: #737373; line-height: 25px; vertical-align: top;">마사지시간</td>
                                  <td colspan="2" style="padding: 16px 0 10px 0; line-height: 25px; color: #2A2A2E; vertical-align: top;">${massageTime}</td>
                              </tr>
                              <tr><td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:602px;margin:0px;"></tr>
                              <tr>
                                  <td colspan="1" style="width: 160px; padding: 16px 18px 10px 0; color: #737373; line-height: 25px; vertical-align: top;">마사지</td>
                                  <td colspan="2" style="padding: 16px 0 10px 0; line-height: 25px; color: #2A2A2E; vertical-align: top;">${massageKor.join(
                                    "<br/>"
                                  )}</td>
                              </tr>
                              <tr><td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:602px;margin:0px;"></tr>
                              <tr>
                                  <td colspan="1" style="width: 160px; padding: 16px 18px 10px 0; color: #737373; line-height: 25px; vertical-align: top;">드랍장소</td>
                                  <td colspan="2" style="padding: 16px 0 10px 0; line-height: 25px; color: #2A2A2E; vertical-align: top;">${dropLocation}</td>
                              </tr>
                              <tr><td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:602px;margin:0px;"></tr>
                              <tr>
                                  <td colspan="1" style="width: 160px; padding: 16px 18px 10px 0; color: #737373; line-height: 25px; vertical-align: top;">기타사항</td>
                                  <td colspan="2" style="padding: 16px 0 10px 0; line-height: 25px; color: #2A2A2E; vertical-align: top;">${
                                    req.body.memo
                                  }</td>
                              </tr>
                              <tr><td colspan="3"style="padding:0;margin:0;border-bottom:1px solid #DDDFE2;background:none;height:1px;width:602px;margin:0px;"></tr>
                        </tbody>
                    </table>
                </td>
            </tr>
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

    return res.status(200).json({ ok: true, result: {} });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
}
