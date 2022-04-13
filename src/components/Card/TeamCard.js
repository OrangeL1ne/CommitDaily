import React from "react";
import styled from "styled-components";
import {ProgressBar} from "../ProgressBar";

const HeadingText = styled.h2`
  margin: 0 0 50px 0;
  font-weight: 800;
  font-size: 48px;
  line-height: 63px;
  color: var(--color-black);
`;

const PeriodText = styled.p`
  padding: 0 12px;
  margin: 0 0 20px 0;
  display: inline-block;
  font-weight: 500;
  font-size: 24px;
  line-height: 40px;
  color: #313131;
  background-color: #D6EEC9;
  border-radius: 33px;
`;

export const TeamCard = ({data}) => {
  const startDate = (data.start.getMonth() + 1) + '/' + data.start.getDate(); // 시작일
  const endDate = (data.end.getMonth() + 1) + '/' + data.end.getDate(); // 종료일
  const period = Math.floor((data.end.getTime() - data.start.getTime()) / (1000 * 60 * 60 * 24)) + 1; // 기간

  return (
    <header>
      <HeadingText>{data.team}</HeadingText>
      <PeriodText>Period : {startDate} ~ {endDate} (총 {period}일)</PeriodText>
      <ProgressBar value="70" />
    </header>
  );
}

TeamCard.defaultProps = {
  data: {
    team: 'TEAM NAME 🍀',
    start: new Date('2022-01-01'),
    end: new Date('2022-02-02'),
  },
};

