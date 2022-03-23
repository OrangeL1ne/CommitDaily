import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border-radius: 7px;

  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;

  letter-spacing: 0.02em;

  color: #2b6f36;
`;
const Progress = styled.progress`
width : 75%;
border-radius : 6px;
::-webkit-progress-value {
  background-color: #36A347 !important;
  border-radius : 6px;
}
::-moz-progress-bar {
  background-color: #36A347 !important;
  border-radius : 6px;
}
color: #36A347;
::-webkit-progress-bar {
  background-color: #eeeeee; width: 100%;
  border-radius : 6px;
}
background-color: #eeeeee;
`;

const Bar = ({ value, max }) => {
  return <Progress value={value} max={max} />;
};

Bar.prototypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  
};

Bar.defaultProps = {
  max: 100,
};

export const ProgressBar = (props) => {
  return (
    <Container>
      Start
      <Bar max="100" value={props.value} />
      (D-47)
    </Container>
  );
};
