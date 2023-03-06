import { createTheme, ThemeProvider } from '@mui/material';
import HomeScreen from './components/screens/HomeScreen';
import "./Styles/app.scss"
import GameScreen from './components/screens/GameScreen';


function App() {

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff"
    }
  }
})

  return (
    <ThemeProvider theme={theme}>

   <div className="App">
    <HomeScreen />
    <GameScreen />
   </div>
    </ThemeProvider>
  );
}

export default App;
