import React, {useRef, useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Card = styled.div`
  width: 1170px;
  height: 100%;
  padding: 20px 0 48px 24px;
  background-color: var(--color-white);
  border-radius: 7px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
`;

const HeadingText = styled.h2`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: var(--color-black);
`;

const CommitContainer = styled.div`
  width: 100%;
  overflow: scroll;
`;

const Text = styled.text`
  font-weight: 500;
  font-size: 18px;
  fill: var(--color-black);
`;

const TooltipText = styled.div`
  width: 304px;
  height: 61px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(${props => props.left}px, ${props => props.top}px);
  z-index: 10;
  pointer-events: none;
  font-family: "JetBrains Mono", sans-serif;
  font-size: 22px;
  line-height: 29px;
  color: var(--color-white);
  background-color: #141414;
  border-radius: 7px;

  &:after {
    border-top: 10px solid #141414;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0 solid transparent;
    content: "";
    position: absolute;
    top: 61px;
    left: 142px;
  }

  span {
    font-size: 18px;
  }
`;

export const CommitCard = ({data}) => {
  const [tipPosition, setTipPosition] = useState( {left: -1, top: -1});
  const [tipCommit, setTipCommit] = useState({});
  const tipRef = useRef(-1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function handleMouseOver(e, commit) {
    const parent = tipRef.current.getBoundingClientRect();
    const rect = e.target.getBoundingClientRect();

    setTipPosition({left: rect.x - parent.x - 156, top: rect.y - parent.y - 110});
    setTipCommit({date: new Date(commit[0]), commit: commit[1]});
  }

  function handleMouseOut() {
    setTipPosition({left: -1, top: -1});
    setTipCommit({});
  }

  function getNth(date) {
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  const userList = data.map((user, i) => {
    return <Text y={i * 49 + 16} key={i}>{user.userName}</Text>
  });

  const dateList = data.length > 0 && [...data[0].commits?.keys()].map((commit, i) => {
    const date = new Date(commit);
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return <Text transform="translate(-3, 0)" x={i * 72} y="0" key={i}>{month + '/' + day}</Text>
  });

  const commits = data && data?.map((user, idx) => {
    const commitList = Array.from(user.commits.entries()).map((commit, i) => {
      let index = 0;

      if (commit[1] >= 9) index = 9;
      else if (commit[1] >= 7) index = 7;
      else if (commit[1] >= 5) index = 5;
      else if (commit[1] >= 3) index = 3;
      else if (commit[1] >= 1) index = 1;

      return (
        <g key={i} onMouseEnter={e => handleMouseOver(e, commit)}
           onMouseLeave={handleMouseOut}>
          <rect
            width="41" height="26" x={i * 72} rx="6" fill={`var(--color-green-${index})`} strokeWidth="1" stroke="#DEDEDE"
          />
        </g>
      )
    });

    return <g transform={`translate(0, ${idx * 49})`} key={idx}>{commitList}</g>
  });

  return (
    <Card ref={tipRef}>
      <HeadingText>잔디 밭 🌱</HeadingText>
      <div style={{display:'flex'}}>
        <CommitContainer>
          <svg width={data && 72 * dateList.length + 140 || 0} height={(data.length + 1) * 49 + 16}>
            <g transform="translate(152, 45)">
              {dateList}
            </g>
            <g transform="translate(0, 72)">
              {userList}
            </g>
            <g transform="translate(152, 72)">
              {commits}
            </g>
          </svg>
        </CommitContainer>
        {tipPosition.top > -1 && tipPosition.left > -1 && Object.keys(tipCommit).length > 0 &&
          <TooltipText left={tipPosition.left} top={tipPosition.top}>
            {tipCommit.commit}commits
            <span>&nbsp;on {months[tipCommit.date.getMonth()]} {tipCommit.date.getDate() + getNth(tipCommit.date.getDate())}</span>
          </TooltipText>
        }
      </div>
    </Card>
  );
};

CommitCard.prototypes = {
  data: PropTypes.array.isRequired,
};
CommitCard.defaultProps = {
  data: [],
}
