import { createTheme, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import HomeScreen from './components/screens/HomeScreen';
import "./Styles/app.scss"
import GameScreen from './components/screens/GameScreen';
import BattleScreen from './components/screens/BattleScreen';
import BattleSong from './assets/sounds/Battle.mp3';
import littleRoot from "./assets/sounds/105 Littleroot Town.mp3"
import PokeDexScreen from './components/screens/PokeDexScreen';


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
    case "PokeDex":
      return <PokeDexScreen/> 
      
  }
}

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <audio id="battle-song">
          <source src={BattleSong} type="audio/mp3" />
        </audio>
        <audio id="little-root" loop={true}>
          <source src={littleRoot} type="audio/mp3" />
        </audio>
        {setActiveScreen(displayState)}
      </div>
    </ThemeProvider>
  );
}

export default App;
