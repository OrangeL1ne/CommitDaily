import React from "react";
import styled from "styled-components";

const HeaderBlock = styled.header`
  max-width: 1194px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeadingText = styled.h1`
  margin: 0;
  display: inline-block;
  font-weight: 800;
  font-size: 32px;
  line-height: 42px;
  color: var(--color-black);
`;

const Button = styled.button`
  width: 156px;
  height: 46px;
  font-weight: 600;
  font-size: 22px;
  color: var(--color-white);
  background-color: var(--color-green-7);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  &:hover {
    background-color: var(--color-green-9);
  }
`;

export const Header = ({_onClick}) => {
  return (
    <HeaderBlock>
      <HeadingText>COMMITDAILY 🍀</HeadingText>
      <Button onClick={_onClick}>LOGIN</Button>
    </HeaderBlock>
  );
}
