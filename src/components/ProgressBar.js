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
const Bar = styled.progress`
::-webkit-progress-bar{background-color: #eeeeee; width:100%}
accent-color: #36A347;
width: 80%;
margin: 20px;
color: #36A347;
`;

const Bar1 = ({ value, max }) => {
  return <progress value={value} max={max} />;
};

Bar1.prototypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  
};

Bar1.defaultProps = {
  max: 100,
};
//https://www.youtube.com/watch?v=3sH_Kq9e5hQ

export const ProgressBar = (props) => {
  return (
    <Container>
      Start
      <Bar max="100" value={props.value} />
      (D-47)
    </Container>
  );
};
