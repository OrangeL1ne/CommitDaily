import React from "react";
import styled from "styled-components";
import { ProgressBar } from "../components/ProgressBar";
import { TeamInfo } from "../components/TeamInfo";
import { StatusCard } from "../components/StatusCard";

const PageContainer = styled.div`
  margin: 100px;
`;

const MainPage = () => {
  return (
    <PageContainer>
      <ProgressBar value="25"/>
      <TeamInfo content="md파일!!"/>
      <StatusCard title="오늘의 출석률" current="2" total="/7명"/>
      <StatusCard title="전체 출석 일수" current="2" total="/8일"/>
      <StatusCard title="전체 커밋 개수" current="47개"/>
    </PageContainer>
  );
};

export default MainPage;
