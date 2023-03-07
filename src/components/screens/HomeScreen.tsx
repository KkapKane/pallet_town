import { Box, TextField, Typography, Button } from '@mui/material';

import pokemonLogo from '../../assets/pokemonlogo.png';
import background from '../../assets/background.jpg';
import { useState } from 'react';
import { useDispatch,  } from 'react-redux';
import { switchDisplay } from '../../redux/slices/displaySlice';
import { setPlayerName } from '../../redux/slices/playerSlice';


export default function HomeScreen() {

  const [opacity, setOpacity] = useState(1)
  const [name, setName] = useState("")

  const dispatch = useDispatch()
  const transition = () => {
    
    
    setOpacity(0)
    dispatch(switchDisplay("Game"))
    dispatch(setPlayerName(name))
    
  };







  const Styles = {
    mainScreenStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100vw',
    
      transition: ' 2000ms',
      zIndex: 99,
      opacity: opacity
    },

    gameContainerStyle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: '80%',
      width: '80%',
      bgcolor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '4px',
      backdropFilter: 'blur(2px)',
      boxShadow: '-4px 4px 12px 1px'
    }
  };

 

  return (
    <Box sx={Styles.mainScreenStyle}>
      <Box sx={Styles.gameContainerStyle}>
        <Box component="img" src={pokemonLogo} sx={{ width: '50%' }} />
        <Typography variant="h4" sx={{ color: 'white', textAlign: 'center' }}>
          What's your name?
        </Typography>
        <TextField
          variant="standard"
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            border: '1px solid white',
            borderRadius: 1,
            width: "30%",
          }}
          label="Name"
          inputProps={{ maxLength: 22, disableunderline:"true" , style: { color: 'white'} }}
          onChange={(e) => setName(e.target.value)}></TextField>
        <Button onClick={transition} variant="outlined" sx={{ backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', width: '20%', fontSize: '1.3rem' }} size="large">
          Start
        </Button>
      </Box>
    </Box>
  );
}
