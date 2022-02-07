import React from 'react'
import styled from "styled-components";

const TempText = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const Temp = () => {
  return (
    <div>
      <TempText>커밋 데일리</TempText>
      <TempText>임시 컴포넌트</TempText>
    </div>
  )
}