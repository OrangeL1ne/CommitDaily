import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  background: #ffffff;
  width: 1194px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  cursor: pointer;
`;
const Header = styled.div`
  width: 1194px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  text-align: left;
  padding-top: 20px;
  padding-left: 40px;
  padding-bottom: 20px;

  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #000000;
`;
const Button = styled.div`
  text-align: right;
  padding-right: 40px;

  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #000000;
`;
const Contents = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  height: 400px;
`;
const Rotate = styled.div`
-ms-transform: rotate(90deg) scaleY(2); /* IE 9 */
transform: rotate(90deg) scaleY(2);

text-align: left;
padding-top: 20px;
padding-left: 40px;
padding-bottom: 20px;
`

export const TeamInfo = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    if (isOpen) {
      // 열렸을때
      console.log("닫기");
      return setIsOpen();
    }
    setIsOpen(true);
    console.log("열기");
  }

  //아코디언
  return (
    <Container>
      <Header onClick={toggle}>
        <Title>팀 소개</Title>
        <Rotate><Button>{isOpen ? `<` : `>` }</Button></Rotate>
      </Header>
      {isOpen ? <Contents> {props.content}</Contents> : null}
    </Container>
  );
};
