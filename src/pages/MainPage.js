import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {Header} from "../components/Header";
import {TeamCard} from "../components/Card/TeamCard";
import {RankingCard} from "../components/Card/RankingCard";
import {InfoCard} from "../components/Card/InfoCard";
import {StatusCard} from "../components/Card/StatusCard";
import {CommitCard} from "../components/Card/CommitCard";
import {TeamData} from "../assets/TeamData";
import {TempUser} from "../assets/TempUser";
import {firestore} from "../service/firebase";




const PageContainer = styled.main`
  max-width: 1194px;
  margin: 0 auto;
  padding: 121px 0;
`;

const Section = styled.section`
  margin: 48px 0 0;
`;

const MainPage = () => {

    //랭킹카드 안가져와지는 것도 데이터가 아직 0인 상태에서 불러와서 안보이는 것임 -> 가끔가다 보이는게 합리적 의심
  //collection:user
  //document:M5mwnQA09nynnAfNMUWK//
  //isAuth -> 로그인한 사람의 isAuth를 false-> true


  let today=new Date().toDateString();

  const [users, setUsers] = useState(['eeseung', 'bogyung1', 'Loy-Yun', 'seonggwonyoon']);
  const [userCommits, setUserCommits] = useState([]);
  const [totNum, setTotNum]=useState(0);
  const [totCommit,setTotCommit]=useState(0);
  const [isLoading, setIsLoading]=useState(true);

   useEffect(() => {
     const requests = users.map(user => axios.get(user));
     const cheerio = require('cheerio');


     axios.all(requests).then(
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
         })).catch(errors => {
       console.error(errors);

     });

     //로그인한 사람 정보 가져와서
     // isAuth: bogyung -> login -> firebase 미리 저장되어있음 -> login: false -> login : true -> 화면에 추가가되는거쥐
     //isAuth: bogyung -> lohin -> lohin:true -> 원래 화면 내보내면 됨

    console.log("@@@@@@@@@@@@")
    const user=firestore.collection("user");
    user.get().then((docs)=>{

        docs.forEach((doc)=>{
            if(doc.exists){
                console.log(doc.data());
                console.log(doc.id);
            }
        });
    });


     setIsLoading(false);
     // setTotCommit(userCommits[0].commits.size);
     // setTotNum(userCommits.length);
       setTotCommit(17);
       setTotNum(4);

   }, [users])

  //console.log();
  //console.log(userCommits[0].commits.get("Sun Jan 02 2022"));

  console.log(userCommits);


  function handleLogin() {
    // TODO: login
  }

  //오늘의 출석률
  function todayAttendee(today){
     try{
       let todayAttendee=0;
       for (let i=0; i<userCommits.length; i++){
         if (userCommits[i].commits.get(today) !=="0"){
           todayAttendee++;
         }}
       return todayAttendee.toString();
     }catch (error){
     }
  }

  //전체 출석 일수
  function totalAttendDay(){
       //forEach문해서 안에 조건문 넣기
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
        <text>Loading your Commits...</text>
      </>
  ): (
    //case false
    <>

      <Header _onClick={handleLogin} />
      <PageContainer>
        <TeamCard data={TeamData} />
        <Section>
          <InfoCard content="md파일!!"/>
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
          <CommitCard data={TempUser} />
        </Section>
      </PageContainer>
    </>
  );
};

export default MainPage;
