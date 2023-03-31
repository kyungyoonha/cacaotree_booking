import React from "react";

import { QuestionSelectWithSvg } from "@components/QuestionSelect";
import { itemList } from "./feature";
import LayoutQuestion from "@components/LayoutQuestion";
import useMutation from "src/libs/useMutation";
import { EmailResponse } from "src/pages/api/nodemailer";
import { useUIContext } from "src/contexts";

const HomeView = () => {
  const [sendEmail, { loading, data, error }] =
    useMutation<EmailResponse>("/api/nodemailer");
  const { carts } = useUIContext();
  const onClickButton = () => {
    sendEmail(carts);
  };

  return (
    <LayoutQuestion>
      {loading && <div>fewfewfewfweefewfewef</div>}
      <button onClick={onClickButton}>few</button>
      <QuestionSelectWithSvg
        buttonName="예약하기"
        itemList={itemList}
        title={
          <>
            어떤 패키지를
            <br />
            생각중이신가요?
          </>
        }
      />
    </LayoutQuestion>
  );
};

export default HomeView;
