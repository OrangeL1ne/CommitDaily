import './App.css';
import MainPage from "./pages/MainPage";

function App({authService}) {

  authService.login('Github').then(result=>console.log(result));

  return (
    <MainPage />
  );
}

export default App;
