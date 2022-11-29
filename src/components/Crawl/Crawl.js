const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
let getCommitNums=async function() {
    // 브라우저를 실행한다.
    // 옵션으로 headless모드를 끌 수 있다.
    const browser = await puppeteer.launch({
        headless: false
    });

    // 새로운 페이지를 연다.
    const page = await browser.newPage();

    //커밋개수 저장한 딕셔너리
    const commitObj={};

    // 페이지의 크기를 설정한다.
    await page.setViewport({
        width: 1366,
        height: 768
    });
    // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
    await page.goto('https://ghchart.rshah.org/bogyung1');

    const content = await page.content();
    // cheerio: 원하는 데이터 추출
    // $에 cheerio를 로드한다.
    const $ = cheerio.load(content);
    // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
    const lists = $("svg > rect");
    // 모든 리스트를 순환한다.
    lists.each((index, list) => {
        const date = $(list).attr('data-date');
        commitObj[date]=$(list).attr('data-score');
        //console.log(index, date, commitN);
    });

    for (var key in commitObj){
        console.log("key: "+ key+", value=: "+commitObj[key]);
    }

    // 브라우저를 종료한다.
    await browser.close();

    return commitObj;


}();
export default getCommitNums;


