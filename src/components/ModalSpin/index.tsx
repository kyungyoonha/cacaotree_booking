import React, { useEffect, useState } from 'react'
import * as S from './style'

const ModalSpin = ({ loading }: { loading: boolean }) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setOpenModal(loading)
  }, [loading])

  return (
    <S.Wrapper className={openModal ? 'visible' : ''}>
      <S.SpinWrapper className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </S.SpinWrapper>
    </S.Wrapper>
  )
}

export default ModalSpin
