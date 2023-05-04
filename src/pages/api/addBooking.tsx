import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { CartsResult } from "@types";
const { GoogleSpreadsheet } = require("google-spreadsheet");

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderInfo, cartItems } = req.body as CartsResult;
  const { name, email, phone } = orderInfo;

  if (req.method !== "POST") {
    return res.status(404).send({ ok: "fail", error: "Begone." });
  }

  let result = [];
  let resultRow = {};
  resultRow["company"] = "CacaoTree";
  resultRow["name"] = name;
  resultRow["email"] = email;
  resultRow["phone"] = phone;
  resultRow["confirmDone"] = "N";

  cartItems.forEach((cartItem) => {
    let tempResultRow = { ...resultRow };
    let {
      key,
      form,
      paymentMethod,
      itemPayment,
      itemDiscount,
      itemAdditional,
    } = cartItem;
    let { massageList, ...formEtc } = form;

    tempResultRow["paid"] = paymentMethod === "won" ? "Y" : "N";
    tempResultRow["paymentWon"] = paymentMethod === "won" ? itemPayment : "";
    tempResultRow["paymentPeso"] = paymentMethod === "won" ? "" : itemPayment;
    tempResultRow["massage"] = massageList
      .map(({ massage, sex }, idx) => {
        const afterText = massageList.length === idx + 1 ? "" : " / ";
        return `${massage.split("/")[1]} (${sex})${afterText}`;
      })
      .join("");

    if (itemDiscount || itemAdditional) {
      tempResultRow["discount"] =
        +Number(itemDiscount) - Number(itemAdditional);
    }

    Object.keys(formEtc).forEach((formKey) => {
      let value = formEtc[formKey];

      if (formKey.includes("Location")) {
        value = value.replace("항구드랍 (1인 200페소 추가)", "Port Oceanjet:");
        value = value.replace("필요 없습니다.", "No Need");
        value = value.replace("개별적으로 스파로 오겠습니다.", "No Need");
        value = value.replace("개별 드랍하겠습니다.", "No Need");
        value = value.replace("막탄지역", "");
        value = value.replace("개별적으로 이동하겠습니다.", "No Need");
      }
      if (formKey === "date") {
        let timeFormat = dayjs(formEtc["pickTime"]).format("A");
        value = dayjs(value).format("YYYY. MM. DD");

        if (key.includes("firstday") && timeFormat === "PM") {
          let newDate = dayjs(value).subtract(1, "day").format("YYYY. MM. DD");
          tempResultRow["arrivedDate"] = newDate;
        }

        value = "입금전/" + value;
      }

      if (formKey.includes("Time")) {
        let newTime = dayjs(value).format("HH:mm A");
        if (newTime !== "Invalid Date") value = newTime;
      }

      tempResultRow[formKey] = value;
    });

    if (
      key === "firstday-gold" ||
      key === "firstday-pirate" ||
      key === "firstday-south"
    ) {
      tempResultRow["dollar"] =
        "[" +
        formEtc["companyComb"] +
        "]" +
        (key === "firstday-south"
          ? `\n패키지명: ${formEtc["packageComb"]}`
          : "") +
        "\n고객이름 " +
        name +
        "\n인원수: " +
        formEtc["pax"] +
        "\n날짜: " +
        dayjs(formEtc["date"]).format("YYYY-MM-DD") +
        "\n픽업장소: 카카오트리스파\n드랍장소: " +
        formEtc["dropLocationComb"] +
        "\n연락처: " +
        phone +
        "\n기타: " +
        formEtc["memo"];

      tempResultRow["dropLocation"] = "Tour Pickup";
      tempResultRow["massageTime"] = "After Massage";
    }

    result.push(tempResultRow);
  });

  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    });

    await doc.getInfo();
    let sheet = doc.sheetsByTitle["Booking"];
    await sheet.loadHeaderRow(1);
    await sheet.addRows(result);

    res.status(200).json({ ok: true, result: {} });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
}
