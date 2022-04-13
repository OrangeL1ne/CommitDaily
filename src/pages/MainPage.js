import React from 'react'
import styled from "styled-components";
import {Header} from "../components/Header";
import {TeamCard} from "../components/TeamCard";
import {CommitCard} from "../components/CommitCard";
import {TeamData} from "../assets/TeamData";
import {TempUser} from "../assets/TempUser";

const PageContainer = styled.main`
  max-width: 1194px;
  margin: 0 auto;
  padding: 121px 0;
`;

const Section = styled.section`
  margin: ${props => props.top || 0}px ${props => props.right || 0}px 0 0;
`;

const MainPage = () => {

  function handleLogin() {
    // TODO: login
  }

  return (
    <>
      <Header _onClick={handleLogin} />
      <PageContainer>
        <TeamCard data={TeamData} />
        <Section top={48}>
          <CommitCard data={TempUser} />
        </Section>
      </PageContainer>
    </>
  );
}

export default MainPage;