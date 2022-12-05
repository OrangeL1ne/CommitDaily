import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import {ScrollSection} from "../ScrollSection";
import profile_sample from '../../assets/profile_sample.png';
import axios from "axios";
const Title=styled.text`
  width: 117px;
  height: 50px;
  text-align: center;
  padding-left: 24px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
`;
const ListDiv=styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #A6A6A6;

`;
export const RankingCard = ({data}) => {

    const rank_list=[];

    //(userCommits[0].commits.get("Sun Jan 02 2022")

    for(let i=0; i<data.length; i++){
        rank_list.push({rank:i, user: data[i].userName, n_commit:parseInt(data[i].commits.get("Sun Jan 02 2022"))})
    }
    console.log(rank_list);

    const [dataT, setDataT] = useState([rank_list]);

    useEffect(() => {
        const sorted=[...rank_list].sort((a,b)=>parseInt(b.n_commit)-parseInt(a.n_commit));
        setDataT(sorted);
        }, [])

    // space-between
    //container: 582px

    const listItem = dataT.map((item, idx) =>

        <li key={item}>
            <ListDiv>
                {/*TODO: 1등 아이콘 처리*/}
                <div style={{minWidth:"15px"}}>{idx+1}등</div>
                <div style={{minWidth: "70px" ,padding:"20px 40px 20px 40px"}}>
                    <img alt='profile' src={profile_sample}/>
                </div>
                <div style={{minWidth:"200px"}}>{item.user}</div>
                <div style={{minWidth: "100px"}}>{item.n_commit} commit</div>
            </ListDiv>
        </li>
    );
    return (
        <ScrollSection>
            <Title>오늘의 순위</Title>
            <ul style={{listStyleType:"none"}}>
                {listItem}
            </ul>
        </ScrollSection>
    )
}
