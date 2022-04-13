import React, {useState} from "react";
import styled from "styled-components";

const Card = styled.div`
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

const TooltipText = styled.text`
  position: relative;
  z-index: 100;
  font-size: 22px;
  fill: var(--color-white);
`;

export const CommitCard = ({data}) => {
  const [tipPosition, setTipPosition] = useState( {top: -1, left: -1});
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function handleMouseOver(commit) {
    setTipPosition(commit);
  }

  function handleMouseOut() {
    setTipPosition({top: -1, left: -1});
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
    return <Text y={i * 49 + 16} key={i}>{user.name}</Text>
  });

  const dateList = data[0].commits?.map((commit, i) => {
    const month = ('0' + (1 + commit.date.getMonth())).slice(-2);
    const day = ('0' + commit.date.getDate()).slice(-2);

    return <Text transform="translate(-3, 0)" x={i * 72} y="0" key={i}>{month + '/' + day}</Text>; // translate(143, 0)
  });

  const commits = data.map((user, idx) => {
    const commitList = user.commits?.map((commit, i) => {
      let index = 0;

      if (commit.count >= 9) index = 9;
      else if (commit.count >= 7) index = 7;
      else if (commit.count >= 5) index = 5;
      else if (commit.count >= 3) index = 3;
      else if (commit.count >= 1) index = 1;

      return (
        <g key={i}>
          <rect
            width="41" height="26" x={i * 72} rx="6" fill={`var(--color-green-${index})`} strokeWidth="1" stroke="#DEDEDE"
            onMouseOver={() => handleMouseOver({top: idx, left: i})}
            onMouseOut={handleMouseOut}
          />
          {tipPosition.top !== -1 && tipPosition.left !== -1 && tipPosition.top === idx && tipPosition.left === i &&
            <g>
              <svg width="304" height="73" x={tipPosition.left * 72 - 132} y="-65" viewBox="0 0 304 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.98">
                  <rect y="0.881836" width="304" height="61" rx="7" fill="#141414" />
                  <path d="M153.239 72.8818L137.957 59.1338H168.109L153.239 72.8818Z" fill="#141414" />
                </g>
              </svg>
              <TooltipText transform="translate(0, 0)" x={tipPosition.left * 72 - 104} y="-26">
                {commit.count}commits on {months[commit.date.getMonth()]} {commit.date.getDate() + getNth(commit.date.getDate())}
              </TooltipText>
            </g>
          }
        </g>
      )
    });

    return <g transform={`translate(0, ${idx * 49})`} key={idx}>{commitList}</g>
  });

  return (
    <Card>
      <HeadingText>잔디 밭 🌱</HeadingText>
      <div style={{display:'flex'}}>
        <CommitContainer>
          <svg width={72 * data[0].commits.length + 140} height={(data.length + 1) * 49 + 16}>
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
      </div>
    </Card>
  );
};

CommitCard.defaultProps = {
  team: {
    start: new Date('2022-01-01'),
    end: new Date('2022-01-17')
  }
};

