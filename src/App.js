import './App.css';
import MainPage from "./pages/MainPage";
import {useState} from "react";

function App({authService}) {

  const [userEmail, setUserEmail]=useState('');

  //authService.login('Github').then(result=>console.log(result.user.email));


  return (
    <MainPage />
  );
}

export default App;
