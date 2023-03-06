import { Box } from '@mui/material';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import professorOak from '../../assets/professorOak.png';
import oak2 from '../../assets/oak2.png';
import { useEffect, useState } from 'react';
import Dialog from '../gameMechanics/Dialog';
import { Pokemon } from '../Pokemon';

export default function GameScreen() {
  const displayState = useSelector((state: RootState) => state.display.value);
  const dialogState = useSelector((state: RootState) => state.dialogIndex.index);

  const [oakPos, setOakPos] = useState({ oak1: '-100%', oak2: '-100%' });

  useEffect(() => {
    if (displayState == 'Game') {
      const delayedOak = setTimeout(() => {
        setOakPos({ ...oakPos, oak1: '0%' });
      }, 100);
      return () => clearTimeout(delayedOak);
    }
  }, [displayState]);

  useEffect(() => {
    if (dialogState == 2) {
      const delayedOat2 = setTimeout(() => {
        setOakPos({ ...oakPos, oak2: '0%' });
      });
    }
  });

  const starterPokemon = ['charmander', 'squirtle', 'bulbasaur'];

  const styles = {
    mainScreenStyle: {
      display: displayState == 'Home' ? 'none' : 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: '0%',
      left: oakPos.oak1,
      justifyContent: 'center',
      alignItems: 'center',

      height: '100vh',
      width: '100vw'
    },
    oak1: {
      display: dialogState >= 2 ? 'none' : 'flex',
      position: 'absolute',
      scale: 2,
      top: '20%',

      transition: '2000ms'
    },
    oak2: {
      display: dialogState < 2 ? 'none' : 'flex',
      position: 'absolute',
      top: { lg: '25%', md: '40%', sm: '40%', xs: '48%' },
      left: oakPos.oak2,
      transition: '1000ms',

      height: { lg: '80%', md: '70%', sm: '60%', xs: '68%' }
    },
    pokemonContainer: {
      display: 'flex',
      position: 'absolute',
      width: "100%",
      justifyContent: "space-evenly",
      top: '10%',
      border: "1px solid black"
    }
  };
  return (
    <Box sx={styles.mainScreenStyle}>
      <Box sx={styles.pokemonContainer}>
        {dialogState == 2
          ? starterPokemon.map((pokemon) => {
              return <Pokemon name={pokemon} />;
            })
          : null}
      </Box>
      <Box component="img" src={professorOak} sx={styles.oak1} />
      <Box component="img" src={oak2} sx={styles.oak2} />
      <Dialog />
    </Box>
  );
}
