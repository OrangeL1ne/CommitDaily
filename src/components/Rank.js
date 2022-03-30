import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import {ScrollSection} from "./ScrollSection";
import profile_sample from '../assets/profile_sample.png';
// import ranker1 from '../assets/ranker1.png';
// const Container = styled.div`
//   overflow: scroll;
//   font-weight: bold;
//   width:582px;
//   height: 720px;
//   background: #FFFFFF;
//   box-shadow: 0 2px 10px;
//
// `;
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
export const Rank = () => {
    const rank_list = [
        {
            rank: 1,
            profile: '../assets/profile_sample.png',
            user: 'Bogyung',
            n_commit: 3,
        },
        {
            rank: 2,
            profile: '',
            user: 'Robin',
            n_commit: 4,
        },
        {
            rank: 3,
            profile: '',
            user: 'Robin',
            n_commit: 5,
        },
        {
            rank: 4,
            profile: '',
            user: 'Robin',
            n_commit: 6,
        },
        {
            rank: 5,
            profile: '',
            user: 'Robin',
            n_commit: 1,
        },
        {
            rank: 6,
            profile: '',
            user: 'Robin',
            n_commit:21,
        },
        {
            rank: 7,
            profile: '',
            user: 'Robin',
            n_commit: 16,
        },
        {
            rank: 8,
            profile: '',
            user: 'Robin',
            n_commit: 11,
        },{
            rank: 9,
            profile: '',
            user: 'Robin',
            n_commit: 16,
        },{
            rank: 10,
            profile: '',
            user: 'Robin',
            n_commit: 31,
        },{
            rank: 11,
            profile: '',
            user: 'Robin',
            n_commit: 11,
        },
    ];

    const [data, setData] = useState([rank_list]);

    useEffect(() => {


        const sorted=[...rank_list].sort((a,b)=>b.rank-a.rank);
        setData(sorted.reverse());
        }, [])


    // space-between
    //container: 582px

    const listItem = data.map((item) =>
        <li key={item.rank}>
            <ListDiv>
                <div style={{minWidth:"15px"}}>{item.rank}등</div>
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
