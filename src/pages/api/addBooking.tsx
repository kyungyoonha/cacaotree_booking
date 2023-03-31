import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { CartsResult } from "@types";
import productMap from "@configs/productMap";
const { GoogleSpreadsheet } = require("google-spreadsheet");

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

type Result = resultType[];

type resultType = {
  [key: string]: string;
};

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
      let timeFormat = dayjs(value).format("A");

      if (formKey.includes("Location")) {
        value = value.replace("항구드랍 (1인 200페소 추가)", "Port");
        value = value.replace("필요 없습니다.", "No Need");
        value = value.replace("개별적으로 스파로 오겠습니다", "No Need");
        value = value.replace("개별 드랍하겠습니다.", "No Need");
      }
      if (formKey === "date") {
        value = dayjs(value).format("YYYY. MM. DD");

        if (key.includes("firstday") && timeFormat === "PM") {
          let newDate = dayjs(value).subtract(1, "day").format("YYYY. MM. DD");
          tempResultRow["arrivedDate"] = newDate;
        }
      }

      if (formKey.includes("Time")) {
        value = dayjs(value).format("HH:mm A");
      }

      tempResultRow[formKey] = value;
    });

    const format = productMap[key].format;
    Object.keys(format).forEach((key) => (tempResultRow[key] = format[key]));

    result.push(tempResultRow);
  });

  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    });

    result.forEach(async (rowData) => {
      await doc.getInfo();
      let sheet = doc.sheetsByTitle["Test"];
      await sheet.loadHeaderRow(1);
      await sheet.addRow(rowData);
    });

    res.status(200).json({ ok: true, result: {} });
  } catch (error) {
    console.log(error);

    res.status(500).json({ ok: false, error });
  }
}
