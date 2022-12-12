import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {join} from "../services/auth";
import {Header} from "../components/Header";
import {TeamCard} from "../components/Card/TeamCard";
import {RankingCard} from "../components/Card/RankingCard";
import {InfoCard} from "../components/Card/InfoCard";
import {StatusCard} from "../components/Card/StatusCard";
import {CommitCard} from "../components/Card/CommitCard";
import {TeamData} from "../assets/TeamData";
import {db} from "../firebase";
import {collection, getDocs} from "firebase/firestore";

const LoadingStatus=styled.text`
    font-size: 20px;
`;
const PageContainer = styled.main`
  max-width: 1194px;
  margin: 0 auto;
  padding: 121px 0;
`;
const Section = styled.section`
  margin: 48px 0 0;
`;

const MainPage = () => {

  let today=new Date().toDateString();

  const [users, setUsers] = useState([]);
  const [userCommits, setUserCommits] = useState([]);
  const [totNum, setTotNum]=useState(0);
  const [totCommit,setTotCommit]=useState(0);
  const [isLoading, setIsLoading]=useState(true);

    async function fetchUserData(){
        (await getDocs(collection(db, "user"))).
        forEach((doc)=>{
                if(!users.includes(doc.data().userId)){
                    users.push(doc.data().userId);
                    setUsers(users);
                }
            }
        );

        const requests = users.map(user => axios.get(user));
        const cheerio = require('cheerio');

        await axios.all(requests).then(
            axios.spread((...response) => {
                const result = response.map((r, i) => {
                    const $ = cheerio.load(r.data);
                    const rects = [];
                    const commitMap = new Map();

                    $('rect').each((index, item) => {
                        rects.push(item.attribs);
                    });
                    rects.forEach(rect => {
                        const date = new Date(rect['data-date']);

                        if (TeamData.start <= date && date <= TeamData.end) {
                            commitMap.set(date.toDateString(), rect['data-score']);
                        }
                    });

                    return ({userName: users[i], commits: new Map([...commitMap.entries()].sort((a, b) => a[0] - b[0]))});
                });

                setUserCommits(result);
                setTotCommit(result[0].commits.size);
                setTotNum(result.length);
                console.log(result);

            })).catch(errors => {
            console.error(errors);
        });
    }

   useEffect(() => {
       fetchUserData().then(r => {console.log("fetchData");});
       setIsLoading(false);
   }, [users])

  function handleLogin() {
    join().then(r => {
      if (r.success) {
        alert(`${r.message} 계정으로 참여했습니다.`);
      } else {
        alert(`참여에 실패했습니다. 관리자에게 문의하세요. (${r.message})`)
      }
    })
  }

  //오늘의 출석률
  function todayAttendee(today){
     try{
       let todayAttendee=0;
       for (let i=0; i<userCommits.length; i++){
         if(TeamData.end< new Date()){
             return "-"
         }
         if (userCommits[i].commits.get(today) !=="0"){
           todayAttendee++;
         }}
       return todayAttendee.toString();
     }catch (error){
     }
  }

  //전체 출석 일수
  function totalAttendDay(){
     try{
       let keys=[];
       for(let [key, value] of userCommits[0].commits){
           keys.push(key);
       }
       let totDay=0;
       for(let i=0; i<userCommits[0].commits.size; i++){
         for(let j=0; j<userCommits.length; j++){
           if(userCommits[j].commits[keys[i]]!==0){
             if(i===userCommits.length-1){
               totDay+=1
             }
            }else{
                 continue
           }}}
       return totDay.toString();
     }catch (e) {
     }
  }

  //전체 커밋 개수
  function funcTotCommits(){
     try{
       let totCommits=0;
       const userN=userCommits.length;
       for (let i=0; i<userN; i++){
           userCommits[i].commits.forEach(value=>totCommits+=parseInt(value));
       }
       return totCommits.toString();
     }catch (e){
     }
  }

  return isLoading ? (
      //case: true
      <>
        <LoadingStatus>Loading your Commits...</LoadingStatus>
      </>
  ): (
    //case false
    <>
      <Header _onClick={handleLogin} />
      <PageContainer>
        <TeamCard {...TeamData} />
        <Section>
          <InfoCard />
        </Section>
        <Section style={{display: 'inline-flex'}}>
          <RankingCard data={userCommits}/>
          <div style={{marginLeft: '30px', display: 'grid', gridColumnGap: '30px', gridRowGap: '24px'}}>
            <StatusCard title="오늘의 출석률" current={todayAttendee(today)} total={"/"+totNum} column="1/2" row="1/2" />
            <StatusCard title="전체 출석 일수" current={totalAttendDay()} total={"/"+totCommit+"일"} column="2/3" row="1/2" />
            <StatusCard title="전체 커밋 개수" current={funcTotCommits()} height={384} column="1/3" row="2/3" />
          </div>
        </Section>
        <Section>
          <CommitCard data={userCommits} />
        </Section>
      </PageContainer>
    </>
  );
};
export default MainPage;
