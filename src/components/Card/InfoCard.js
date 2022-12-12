import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import arrowIcon from '../../assets/arrow.svg';
import readmePath from '../../assets/TeamInfo.md';

const Container = styled.div`
  width: 1146px;
  padding: 20px 24px;
  text-align: center;
  background: var(--color-white);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  cursor: pointer;
`;

const Header = styled.button`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: var(--color-black);
  background-color: var(--color-white);
  border: none;
  
  img {
    width: 24px;
    height: 24px;
  }
`;

const Contents = styled.div`
  padding: 16px;
  text-align: left;
`;

export const InfoCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(readmePath).then(r => r.text()).then(text => {
      setMarkdown(text);
    })
  }, [])

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <Container>
      <Header onClick={toggle}>
        팀 소개
        {isOpen ?
          <img src={arrowIcon} alt="닫기" />
          :
          <img src={arrowIcon} alt="열기" style={{transform: 'rotate(180deg)'}} />
        }
      </Header>
      {isOpen ?
        <Contents>
          <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </Contents>
        :
        null
      }
    </Container>
  );
};
