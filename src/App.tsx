import { createTheme, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import HomeScreen from './components/screens/HomeScreen';
import "./Styles/app.scss"
import GameScreen from './components/screens/GameScreen';
import BattleScreen from './components/screens/BattleScreen';



function App() {
  const { value: displayState } = useSelector((state: RootState) => state.display);
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff"
    }
  }
})



const setActiveScreen = (displayState: string) =>{
  switch (displayState) {
    case "Home":
      return <HomeScreen/> 
    case "Game":
      return <GameScreen/> 
    case "Battle":
      return <BattleScreen/> 
      
  }
}

  return (
    <ThemeProvider theme={theme}>

   <div className="App">
    {setActiveScreen(displayState)}
   </div>
    </ThemeProvider>
  );
}

export default App;
