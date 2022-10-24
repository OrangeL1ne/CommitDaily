import './App.css';
import MainPage from "./pages/MainPage";
import {useEffect} from "react";
import axios from 'axios';

function App() {
  useEffect(() => {
    const cheerio = require('cheerio');
    const $rect = [];

    axios.get(`/eeseung`).then(data => {
      const $ = cheerio.load(data.data);
      $('rect').each((index, item) => {
        $rect.push(item.attribs);
      });

      console.log($rect.map(d => ({date: d['data-date'], count: d['data-score']})));
    });
  }, [])

  return (
    <MainPage/>
  );
}

export default App;
