import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import dialogBox from '../../assets/dialogBox.png';
import { useState, useEffect } from 'react';
import { increment, decrement } from '../../redux/slices/dialogSlice';

export default function Dialog() {
  const [dialogPos, setDialogPos] = useState('-100%');

  const [visibleDialog, setVisibleDialog]: any = useState<string[]>([]);
  const playerState = useSelector((state: RootState) => state.player.PlayerName);
  const starterPokemonState = useSelector((state: RootState) => state.player.starterPokemon);
  const displayState = useSelector((state: RootState) => state.display.value);
  const dialogState = useSelector((state: RootState) => state.dialogIndex.index);
  const dispatch = useDispatch();
  const gameDialog = [
    `Hello ${playerState}! It's a pleasure to meet you. My name is Oak, but people typically call me Professor Oak. Are you ready to dive into the exciting world of Pokemon?`,
    'Excellent! Today, Im going to be your guide and teach you everything you need to know about these fascinating creatures. From their unique affinities to their evolutionary stages, we will explore every aspect of the Pokemon universe.',
    'Let me tell you a secret about every Pokemon you catch. They all have their own special affinity, like fire, water, grass, and more! So choose wisely when it comes to picking your first Pokemon',
    'As Pokemons gain more battle experience, they have the ability to evolve through various stages of development.',
    'Are you ready to become a Pokemon Master? As you know, choosing your first starter Pokemon is crucial to your success. Are you ready to pick your very first companion? Trust me, the adventure is just beginning!',
    'Take your time and choose carefully!'
  ];

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
      setVisibleDialog((oldArray:string[]) => [...oldArray, split[i]]);
      await timer(30); // then the created Promise can be awaited
    }
  }

  let popupSpeed = 2500;

  useEffect(() => {
    if(dialogState > 0){
      popupSpeed = 1000;
    }
    setVisibleDialog([]);
    if (dialogState < 0) return;
    delayedSpeech = setTimeout(() =>{

      grabText();
    },popupSpeed)
    return () => clearInterval(delayedSpeech);
  }, [dialogState]);

useEffect(() =>{ 
console.log(starterPokemonState)
},[starterPokemonState])

  const traverseDialog = (direction: string) => {
    if (direction == 'forward' && gameDialog[dialogState].split("").length == visibleDialog.length) {
      if(dialogState == gameDialog.length - 1) return
      dispatch(increment());
    } else if (direction == 'backward' && gameDialog[dialogState].split('').length == visibleDialog.length) {
      if(dialogState == 0) return;
      dispatch(decrement());
    }
  };

  function waitingOnPlayer() {
    if(dialogState == 5 && starterPokemonState == ''){
      return 'none'
    }
    else {
      return 'flex'
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
      transition: '1000ms',
      
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
        Next
      </Button>
      <Button sx={styles.backButton} onClick={() => traverseDialog('backward')}>
        Prev
      </Button>
    </Box>
  );
}
