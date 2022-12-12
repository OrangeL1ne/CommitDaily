import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {ProgressBar} from "../ProgressBar";

const DAY = 1000 * 60 * 60 * 24;

const HeadingText = styled.h2`
  margin: 0 0 50px 0;
  font-weight: 800;
  font-size: 48px;
  line-height: 63px;
  color: var(--color-black);
`;

const PeriodText = styled.p`
  margin: 0 0 20px 0;
  padding: 0 12px;
  display: inline-block;
  font-weight: 500;
  font-size: 24px;
  line-height: 40px;
  color: #313131;
  background-color: #D6EEC9;
  border-radius: 33px;
`;

export const TeamCard = ({team, start, end}) => {
  const startDate = (start.getMonth() + 1) + '/' + start.getDate();
  const endDate = (end.getMonth() + 1) + '/' + end.getDate();
  const period = Math.floor((end.getTime() - start.getTime()) / DAY) + 1;
  const today = new Date();

  function getValue(today, startDate, endDate) {
    if (endDate > today && today > startDate) {
      const dday = Math.floor((today.getTime() - startDate.getTime()) / DAY) + 1;
      return Math.floor(dday / period * 100);
    }

    return 100;
  }

  function getDDay(today, endDate) {
    return Math.floor((endDate - today) / DAY) + 1;
  }

  return (
    <header>
      <HeadingText>{team}</HeadingText>
      <PeriodText>Period : {startDate} ~ {endDate} (총 {period}일)</PeriodText>
      <ProgressBar value={getValue(today, start, end)} dDay={getDDay(today, end)} />
    </header>
  );
}

TeamCard.prototypes = {
  team: PropTypes.string,
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired
};

TeamCard.defaultProps = {
  team: 'OrangeL1ne',
  start: new Date('2022-01-01'),
  end: new Date('2022-01-31')
}
