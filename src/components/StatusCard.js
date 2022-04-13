import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  width:276px;
  height:312px;
  margin: 48px 15px 24px 15px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
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
  /* identical to box height */

  color: #000000;
`;
const Current = styled.span`
  text-align: center;

  font-style: normal;
  font-weight: 590;
  font-size: 72px;
  line-height: 86px;
  color: #267e34;
`;
const Total = styled.span`
  text-align: center;

  font-style: normal;
  font-weight: 590;
  font-size: 48px;
  line-height: 86px;

  color: #797979;
`;

export const StatusCard = (props) => {

  return (
    <Container>
      <Title>{props.title}</Title>
      <Current>{props.current}</Current>
      <Total>{props.total}</Total>
    </Container>
  );
};
