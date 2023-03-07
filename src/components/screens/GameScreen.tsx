import { Box } from '@mui/material';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import professorOak from '../../assets/professorOak.png';
import oak2 from '../../assets/oak2.png';
import { useEffect, useState } from 'react';
import Dialog from '../gameMechanics/Dialog';
import battleSong from '../../assets/Battle.mp3'
import { getMainScreenStyle, getOak1Style, getOak2Style, getGridLayoutStyle, getPokemonContainerStyle } from '../../Styles/gameScreenStyle';

import Pixel from './Pixel';
import PokemonContainer from '../PokemonContainer';
import { switchDisplay } from '../../redux/slices/displaySlice';
import { switchMode } from '../../redux/slices/dialogSlice';



type OakPos = {
  oak1: string;
  oak2: string;
};

export default function GameScreen() {
 
  const { value: displayState } = useSelector((state: RootState) => state.display);
  const { index: dialogIndex, mode: dialogMode } = useSelector((state: RootState) => state.dialog);

  
  const dispatch = useDispatch()  
  
  const [testState, setTestState] = useState<string[]>([]);
  const [oakPos, setOakPos] = useState<OakPos>({ oak1: '-100%', oak2: '-100%' });

  useEffect(() => {
    if (displayState === 'Game') {
      
      const delayedOak = setTimeout(() => {
        setOakPos((prev) => ({ ...prev, oak1: '0%' }));
      }, 100);
      return () => clearTimeout(delayedOak);
    }
  }, [displayState]);

  const playSound = (src: string) => {
    let sound = new Audio(src);
    sound.volume = 0.25;
    sound.play();
  };

  useEffect(() => {
    if(dialogMode == "intro"){
    switch (dialogIndex) {
      case 2:
        const delayedOat2 = setTimeout(() => {
          setOakPos((prev) => ({ ...prev, oak2: '0%' }));
        });
        return () => clearTimeout(delayedOat2);
      case 4:
        setOakPos((prev) => ({ ...prev, oak2: '40%' }));
        break;
      case 5:
        setOakPos((prev) => ({ ...prev, oak2: '0%' }));
        break;
      case 8:
        playSound(battleSong)
        let i = 0;
        let blackscreen = setInterval(() => {
          if (i === 200) {
            dispatch(switchDisplay("Battle"))
            dispatch(switchMode("battle"))
            clearInterval(blackscreen);

            let whitescreen = setInterval(() => {
              if(i == 0){
                return () => clearInterval(whitescreen)
              }
              let copy = testState;
              copy.pop()
              setTestState(copy)

            },15)



          }
          setTestState((prev) => [...prev, 'yea']);
          i++;
        }, 15);
        return () => clearInterval(blackscreen);
      default:
        break;
    }
  }
  }, [dialogIndex]);



const styles = {
  mainScreenStyle: getMainScreenStyle(displayState, oakPos),
  oak1: getOak1Style(dialogIndex),
  oak2: getOak2Style(dialogIndex, oakPos),
  pokemonContainer: getPokemonContainerStyle(),
  gridLayout: getGridLayoutStyle(),
};

return (
  <Box sx={styles.mainScreenStyle}>
    <Box sx={styles.gridLayout}>
      {testState.map((content: string, i: number) => {
        return <Pixel content={content} key={i} />;
      })}
    </Box>
    <PokemonContainer dialogIndex={dialogIndex} />
    
    <Box component="img" src={professorOak} sx={styles.oak1} />
    <Box component="img" src={oak2} sx={styles.oak2} />
    <Dialog />
    
  </Box>
)}





 