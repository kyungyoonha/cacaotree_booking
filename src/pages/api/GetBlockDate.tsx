import { BlockDates } from "@types";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

const { GoogleSpreadsheet } = require("google-spreadsheet");

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

export interface GetBuyListResult {
  ok: boolean;
  error?: string;
  data: BlockDates;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetBuyListResult>
) {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    });
    await doc.getInfo();
    let sheetOrder = doc.sheetsByTitle["BlockDate"];

    // await sheetOrder.loadHeaderRow(1);
    let rows = await sheetOrder.getRows();

    let blockDatesFirstday = [];
    let blockDatesDaytime = [];
    rows.forEach((row) => {
      if (row.firstday)
        blockDatesFirstday.push(dayjs(row.firstday).format("YYYY-MM-DD"));
      if (row.daytime)
        blockDatesDaytime.push(dayjs(row.daytime).format("YYYY-MM-DD"));
    });

    res.status(200).json({
      ok: true,
      data: {
        blockDatesFirstday,
        blockDatesDaytime,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
