import React from 'react'
import styled from "styled-components";
import {Temp} from "../components/Temp";

const PageContainer = styled.div``;

const MainPage = () => {
  return (
    <PageContainer>
      <Temp/>
    </PageContainer>
  )
}

export default MainPage;