import { Box, Typography } from '@mui/material';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import professorOak from '../../assets/images/professorOak.png';
import oak2 from '../../assets/images/oak2.png';
import { useEffect, useState } from 'react';
import Dialog from '../gameMechanics/Dialog';

import { getMainScreenStyle, getOak1Style, getOak2Style, getGridLayoutStyle, getPokemonContainerStyle, getPokeDexStyle, getArrowStyle, getClickMeStyle } from '../../Styles/gameScreenStyle';
import pokeDex from '../../assets/images/pokeDex.png';
import Pixel from './Pixel';
import PokemonContainer from '../PokemonContainer';
import { switchDisplay } from '../../redux/slices/displaySlice';
import { switchMode } from '../../redux/slices/dialogSlice';
import arrow from '../../assets/images/Arrow.png';
import dialogSound from '../../assets/sounds/SFX_PRESS_AB.wav';

type OakPos = {
  oak1: string;
  oak2: string;
};

export default function GameScreen() {
  const VOLUME = 0.25;
  const { value: displayState } = useSelector((state: RootState) => state.display);
  const { index: dialogIndex, mode: dialogMode } = useSelector((state: RootState) => state.dialog);

  const dispatch = useDispatch();

  const [boxArray, setBoxArray] = useState<string[]>([]);
  const [oakPos, setOakPos] = useState<OakPos>({ oak1: '-100%', oak2: '-100%' });
  const [pokeDexState, setPokeDexState] = useState({ show: false });

  useEffect(() => {
    if (displayState === 'Game') {
      const delayedOak = setTimeout(() => {
        setOakPos((prev) => ({ ...prev, oak1: '0%' }));
      }, 100);
      return () => clearTimeout(delayedOak);
    }
  }, [displayState]);

  const transitionToPokeDexScreen = () => {
    let pewSound = new Audio(dialogSound);
    pewSound.volume = VOLUME;
    pewSound.play();
    dispatch(switchDisplay('PokeDex'));
  };

  const transitionToBattleScene = () => {
    let i = 0;
    //fill up the screen
    let blackscreen = setInterval(() => {
      //once it reaches 200 boxes. switch the display and the dialogmode to battle
      if (i === 200) {
        dispatch(switchDisplay('Battle'));
        dispatch(switchMode('battle'));
        clearInterval(blackscreen);

        let whitescreen = setInterval(() => {
          if (i == 0) {
            return () => clearInterval(whitescreen);
          }
          let copy = boxArray;
          copy.pop();
          setBoxArray(copy);
        }, 15);
      }
      //pushes 200 strings that says black to the box Array
      setBoxArray((prev) => [...prev, 'black']);
      i++;
    }, 15);
    return () => clearInterval(blackscreen);
  };

  useEffect(() => {
    if (dialogMode == 'intro') {
      switch (dialogIndex) {
        case 2:
          //oak slides in from the left to the right
          const delayedOat2 = setTimeout(() => {
            setOakPos((prev) => ({ ...prev, oak2: '0%' }));
          });
          return () => clearTimeout(delayedOat2);
        //slides from right to the left
        case 4:
          setOakPos((prev) => ({ ...prev, oak2: '40%' }));
          break;
        //make him invisible / this stage is when you pick pokemon
        case 5:
          setOakPos((prev) => ({ ...prev, oak2: '0%' }));
          break;
        //battle starts here
        case 8:
          transitionToBattleScene();
        //slide oak to the right again
        case 9:
          setOakPos((prev) => ({ ...prev, oak2: '40%' }));
          break;
        //set oak to stand on the left while he introduces the pokedex
        case 11:
          setOakPos((prev) => ({ ...prev, oak2: '0%' }));
          //shows the floating pokdex
          setPokeDexState({ ...pokeDexState, show: true });
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
    pokeDexStyle: getPokeDexStyle(pokeDexState),
    arrowStyle: getArrowStyle(dialogIndex),
    clickMeStyle: getClickMeStyle(dialogIndex)
  };

  return (
    <Box sx={styles.mainScreenStyle}>
      <Box sx={styles.gridLayout}>
        {boxArray.map((content: string, i: number) => {
          return <Pixel content={content} key={i} />;
        })}
      </Box>
      <PokemonContainer dialogIndex={dialogIndex} />
      {dialogIndex === 5 && displayState == "Game" ? <Typography sx={{ position: "absolute", top: {lg: "50%", md: "50%", sm: "50%" , xs: "40%"},fontSize: "2rem"}}> CLICK ON ONE OF THE POKEMON</Typography> : null}
      <Box component="img" src={professorOak} sx={styles.oak1} />
      <Box component="img" src={oak2} sx={styles.oak2} />
      <Box component="img" src={pokeDex} sx={styles.pokeDexStyle} onClick={() => transitionToPokeDexScreen()} />
      <Box component="img" src={arrow} sx={styles.arrowStyle} />
      <Typography sx={styles.clickMeStyle}>Click Me</Typography>
      <Dialog />
    </Box>
  );
}
