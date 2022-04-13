import React from "react";
import styled from "styled-components";
import {Header} from "../components/Header";
import {TeamCard} from "../components/Card/TeamCard";
import {RankingCard} from "../components/Card/RankingCard";
import {InfoCard} from "../components/Card/InfoCard";
import {StatusCard} from "../components/Card/StatusCard";
import {CommitCard} from "../components/Card/CommitCard";
import {TeamData} from "../assets/TeamData";
import {TempUser} from "../assets/TempUser";

const PageContainer = styled.main`
  max-width: 1194px;
  margin: 0 auto;
  padding: 121px 0;
`;

const Section = styled.section`
  margin: 48px 0 0;
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
        <Section>
          <InfoCard content="md파일!!" />
        </Section>
        <Section style={{display: 'inline-flex'}}>
          <RankingCard />
          <div style={{marginLeft: '30px', display: 'grid', gridColumnGap: '30px', gridRowGap: '24px'}}>
            <StatusCard title="오늘의 출석률" current="2" total="/7명" column="1/2" row="1/2" />
            <StatusCard title="전체 출석 일수" current="2" total="/8일" column="2/3" row="1/2" />
            <StatusCard title="전체 커밋 개수" current="47개" height={384} column="1/3" row="2/3" />
          </div>
        </Section>
        <Section>
          <CommitCard data={TempUser} />
        </Section>
      </PageContainer>
    </>
  );
};

export default MainPage;
