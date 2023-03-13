import { Modal } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useUIContext } from "src/contexts";

const ModalMessage = () => {
  const router = useRouter();
  const { modalOpenForm, onOpenModalForm, dispatch } = useUIContext();
  const onClickOk = () => {
    router.push("/cart");
    onOpenModalForm(false, dispatch);
  };
  const onClickCancel = () => {
    router.push("/");
    onOpenModalForm(false, dispatch);
  };

  return (
    <Modal
      open={modalOpenForm}
      title="카카오트리스파"
      onOk={onClickOk}
      onCancel={onClickCancel}
      okText="장바구니 이동하기"
      cancelText="추가로 예약하기"
    >
      <p>예약서 작성이 완료되었습니다.</p>
    </Modal>
  );
};

export default ModalMessage;
