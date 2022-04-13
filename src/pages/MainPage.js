import React from "react";
import styled from "styled-components";
import {Header} from "../components/Header";
import {TeamCard} from "../components/Card/TeamCard";
import {RankingCard} from "../components/Card/RankingCard";
import {ProgressBar} from "../components/ProgressBar";
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
        <ProgressBar value="70"/>
        <InfoCard content="md파일!!"/>
        <div style={{display:"flex", flexDirection:"horizontal"}}>
          <div>
            <RankingCard/>
          </div>
          <div >
            <div style={{display:"flex", flexDirection:"horizontal"}}>
              <StatusCard title="오늘의 출석률" current="2" total="/7명" />
              <StatusCard title="전체 출석 일수" current="2" total="/8일" />
            </div>
            {/*컴포넌트 width, height가 적용이 안됨*/}
            <StatusCard style={{width:"582px", height:"384px"}} title="전체 커밋 개수" current="47개" />
          </div>
        </div>
        <Section top={48}>
          <CommitCard data={TempUser} />
        </Section>
      </PageContainer>
    </>
  );
};

export default MainPage;
