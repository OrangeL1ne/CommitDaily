import React from 'react'
import styled from "styled-components";
import {Header} from "../components/Header";
import {TeamCard} from "../components/TeamCard";
import {TeamData} from "../assets/TeamData";

const PageContainer = styled.main`
  max-width: 1194px;
  margin: 0 auto;
  padding: 121px 0;
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
      </PageContainer>
    </>
  );
}

export default MainPage;