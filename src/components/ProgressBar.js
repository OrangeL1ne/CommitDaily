import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 1194px;
  height: 64px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #2b6f36;
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
`;

const Progress = styled.progress`
  width: 75%;
  color: #36A347;
  background-color: #eeeeee;
  border-radius: 6px;
  ::-webkit-progress-value {
    background-color: #36A347 !important;
    border-radius : 6px;
  }
  ::-moz-progress-bar {
    background-color: #36A347 !important;
    border-radius : 6px;
  }
  ::-webkit-progress-bar {
    background-color: #eeeeee; width: 100%;
    border-radius : 6px;
  }
`;

export const ProgressBar = ({value, dDay}) => {
  return (
    <Container>
      Start
      <Progress max="100" value={value} />
      (D{dDay > 0 ? ('-' + dDay) : ('+' + (-dDay))})
    </Container>
  );
};

ProgressBar.prototypes = {
  value: PropTypes.number.isRequired,
  dDay: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  value: 100,
  dDay: 0,
};
