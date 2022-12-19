import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import {ScrollSection} from "../ScrollSection";
import profile_sample from '../../assets/profile_sample.png';
import {TeamData} from "../../assets/TeamData";
const Title=styled.text`
  font-size: 24px;

`;
const ListDiv=styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #A6A6A6;
`;

export const RankingCard = ({data}) => {

    const rank_list=[];
    const [dataT, setDataT] = useState([]);

    function fetchRanks(){
        if(TeamData.end< new Date()){
            for(let i=0; i<data.length; i++){
                rank_list.push({rank:i, user: data[i].userName, n_commit:"-", profile_image:"https://github.com/"+data[i].userName+".png"})
            }
            setDataT(rank_list);
        }else{
            for(let i=0; i<data.length; i++){
                rank_list.push({rank:i, user: data[i].userName, n_commit:parseInt(data[i].commits.get(new Date())), profile_image: "https://github.com/"+data[i].userName+".png"})
            }
            setDataT([rank_list]);
            const sorted=[...rank_list].sort((a,b)=>parseInt(b.n_commit)-parseInt(a.n_commit));
            setDataT(sorted);
        }
    }

    useEffect(() => {
        fetchRanks();
        }, [data])

    const listItem = dataT.map((item, idx) =>

        <li key={idx}>
            <ListDiv>
                {/*TODO: 1등 아이콘 처리*/}
                <div style={{minWidth:"15px"}}>{idx+1}등</div>
                <div style={{minWidth: "70px" ,padding:"20px 50px"}}>
                    <img style={{width:"65px", borderRadius: "30px"}} alt='profile' src={item.profile_image}/>
                </div>
                <div style={{minWidth:"200px"}}>{item.user}</div>
                <div style={{minWidth: "100px"}}>{item.n_commit} commit</div>
            </ListDiv>
        </li>
    );
    return (
        <ScrollSection>
            <div style={{padding:"20px", marginLeft:"10px"}}>
                <Title>오늘의 순위</Title>
            </div>
            <ul style={{listStyleType:"none"}}>
                {listItem}
            </ul>
        </ScrollSection>
    )
}
