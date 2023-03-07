import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import dialogBox from '../../assets/dialogBox.png';
import { useState, useEffect } from 'react';
import { increment, decrement } from '../../redux/slices/dialogSlice';

export default function Dialog() {
  const [dialogPos, setDialogPos] = useState('-100%');

  const [visibleDialog, setVisibleDialog]: any = useState<string[]>([]);
  const playerState = useSelector((state: RootState) => state.player.playerName);
  const starterPokemonState = useSelector((state: RootState) => state.player.starterPokemon);
  const displayState = useSelector((state: RootState) => state.display.value);
  const dialogState = useSelector((state: RootState) => state.dialog.index);
  const dispatch = useDispatch();
  const gameDialog = [
    `Well, hello there, young trainer ${playerState}! It's a pleasure to meet you. I am Professor Oak, but most folks just call me "Professor". Are you prepared to dive into the captivating world of Pokémon?`,
    `Excellent! I shall act as your guide and teach you all about these remarkable creatures. We will explore every facet of the Pokémon universe, from their unique affinities to their evolutionary stages.`,
    `Let me share with you a little secret about the Pokémon you will capture on journey. Each Pokémon will have an affinity, such as fire, water, grass, and more! It's essential to choose wisely when selecting your first Pokémon.`,
    `As your Pokémon gain more battle experience, they have the potential to evolve into different stages of development, unlocking even greater powers and abilities.`,
    `Are you prepared to become a true Pokémon Master, ${playerState}? As you know, selecting your first starter Pokémon is critical to your success. Are you ready to choose your very first companion? The adventure is just getting started!`,
    `Take your time and choose carefully, as the Pokémon you pick will be your loyal companion on this exciting journey!`,
    `Great choice! ${starterPokemonState?.name} is a ${starterPokemonState?.types[0]?.type.name} type which I think suits you quite well If I say so myself! `,
    `Now that you have chosen your first Pokémon, lets see what ${starterPokemonState?.name} can do. Are you ready?`,
    `good luck....`
  ];

  const battleDialog = [
    "Professor Oak wants a battle!"
  ]
  useEffect(() => {
    if (displayState == 'Game') {
      dispatch(increment());
      const delayedDialog = setTimeout(() => {
        setDialogPos('-35%');
      }, 1500);
      return () => clearTimeout(delayedDialog);
    }
  }, [displayState]);
  let delayedSpeech: any;

  const timer = (ms: any) => new Promise((res) => setTimeout(res, ms));
  async function grabText() {
    let split = gameDialog[dialogState].split('');
    for (var i = 0; i < split.length; i++) {
      setVisibleDialog((oldArray: string[]) => [...oldArray, split[i]]);
      await timer(0); // ideal speed is 30
    }
  }

  let popupSpeed = 2500;

  useEffect(() => {
    if (dialogState > 0) {
      popupSpeed = 1000;
    }
    setVisibleDialog([]);
    if (dialogState < 0) return;
    delayedSpeech = setTimeout(() => {
      grabText();
    }, popupSpeed);
    return () => clearInterval(delayedSpeech);
  }, [dialogState]);

  const traverseDialog = (direction: string) => {
    if (direction == 'forward' && gameDialog[dialogState].split('').length == visibleDialog.length) {
      if (dialogState == gameDialog.length - 1) return;
      dispatch(increment());
    } else if (direction == 'backward' && gameDialog[dialogState].split('').length == visibleDialog.length) {
      if (dialogState == 0) return;
      dispatch(decrement());
    }
  };

  function waitingOnPlayer() {
    if ((dialogState == 5 && starterPokemonState?.name == null) || '') {
      return 'none';
    } else {
      return 'flex';
    }
  }

  const styles = {
    dialogContainer: {
      display: 'flex',
      justifyContent: 'center',
      height: '30%',
      width: '80%',
      position: 'relative',
      bottom: dialogPos,
      transition: '1000ms'
    },
    dialogImgSrc: {
      position: 'absolute',
      bottom: '0%',
      height: '90%',
      width: '90%'
    },
    dialogText: {
      position: 'absolute',
      top: '20%',
      left: '10%',
      width: '80%',
      zIndex: 98
    },
    nextButton: {
      display: () => waitingOnPlayer(),
      color: 'black',
      position: 'absolute',
      bottom: '10%',
      right: '10%',
      zIndex: 99
    },
    backButton: {
      color: 'black',
      position: 'absolute',
      bottom: '10%',
      left: '10%',
      zIndex: 99
    }
  };
  return (
    <Box sx={styles.dialogContainer}>
      <Typography align="left" fontSize={{ lg: 30, md: 20, sm: 30, xs: 14 }} sx={styles.dialogText}>
        {visibleDialog}
      </Typography>
      <Box component="img" src={dialogBox} sx={styles.dialogImgSrc} />
      <Button sx={styles.nextButton} onClick={() => traverseDialog('forward')}>
        {dialogState == 7 ? 'ready' : 'next'}
      </Button>
      <Button sx={styles.backButton} onClick={() => traverseDialog('backward')}>
        Prev
      </Button>
    </Box>
  );
}
