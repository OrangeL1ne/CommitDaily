import React from 'react'
import styled from "styled-components";
import {Header} from "../components/Header";

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
      </PageContainer>
    </>
  );
}

export default MainPage;