import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import dialogBox from '../../assets/images/dialogBox.png';
import { useState, useEffect } from 'react';
import { increment, decrement, reset } from '../../redux/slices/dialogSlice';
import { useGetPokemonByNameQuery } from '../../redux/pokemonService';
import AttackOptions from './AttackOptions';
import dialogSound from '../../assets/sounds/SFX_PRESS_AB.wav';

interface DialogState {
  index: number;
  mode: string;
}
export default function Dialog() {
  //The lower the number the faster the dialog
  const DIALOG_SPEED = 20;

  const [dialogPos, setDialogPos] = useState('-100%');

  const [visibleDialog, setVisibleDialog]: any = useState<string[]>([]);
  const { data } = useGetPokemonByNameQuery('mew', {});
  const { playerName: playerState, chosenAttack: chosenAttack } = useSelector((state: RootState) => state.player);
  const starterPokemonState = useSelector((state: RootState) => state.player.starterPokemon);
  const displayState = useSelector((state: RootState) => state.display.value);
  const { index: dialogIndex, mode: dialogMode }: DialogState = useSelector((state: RootState) => state.dialog);
  const [disableBackBtn, setDisableBackBtn] = useState(false);
  const dispatch = useDispatch();

  const gameDialog = [
    `Well, hello there, young trainer ${playerState}! It's a pleasure to meet you. I am Professor Oak, but most folks just call me "Professor". Are you prepared to dive into the captivating world of Pokémon?`,
    `Excellent! I shall act as your guide and teach you all about these remarkable creatures. We will explore every facet of the Pokémon universe, from their unique affinities to their evolutionary stages.`,
    `Let me share with you a little secret about the Pokémons you will capture on your journey. Each Pokémon will have an affinity, such as fire, water, grass, and more! It's essential to choose wisely when selecting your first Pokémon.`,
    `As your Pokémon gain more battle experience, they have the potential to evolve into different stages of development, unlocking even greater powers and abilities.`,
    `Are you prepared to become a true Pokémon Master, ${playerState}? As you know, selecting your first starter Pokémon is critical to your success. Are you ready to choose your very first companion? The adventure is just getting started!`,
    `Take your time and choose carefully, as the Pokémon you pick will be your loyal companion on this exciting journey!`,
    `Great choice! ${starterPokemonState?.name} is a ${starterPokemonState?.types[0]?.type.name} type which I think suits you quite well If I say so myself! `,
    `Now that you have chosen your first Pokémon, lets see what ${starterPokemonState?.name} can do. Are you ready?`,
    `Good luck....`,
    `...Are you sure you haven't done this before?`,
    `Well anyways, I think you are ready to go out on your own.`,
    `But before you go, I must brief you on the Pokédex.`,
    `The Pokédex holds vital information about all the Pokémon we've discovered so far.`,
    'Use it to search a Pokémon you wish to know more about.',
    `Go ahead, ${playerState}, give it a try, and expand your knowledge about the world of Pokémon!`
  ];

  const battleDialog = [
    'Professor Oak wants a battle!',
    `Professor Oak sent out ${data?.name}!`,
    `Go! ${starterPokemonState?.name}!`,
    '',
    `${starterPokemonState?.name} uses ${chosenAttack}!`,
    `It's very effective!`,
    `${playerState} defeated Professor Oak!!`
  ];

  const playSound = (src: string) => {
    let sound = new Audio(src);
    sound.volume = 0.25;
    sound.play();
  };

  // decalre the main theme song and also set volume to 25%
  let littleRoot = document.getElementById('little-root') as HTMLAudioElement;
  if (littleRoot) {
    littleRoot.volume = 0.25;
  }

  useEffect(() => {
    //when switching to the battle screen reset the dialog index to 0
    if (dialogMode == 'battle') {
      dispatch(reset());
    }
  }, []);

  useEffect(() => {
    // disable the back button if you are in a battle or if you just got out of the battle. Also if it's the first dialog index.
    if (displayState == 'Battle' || (displayState == 'Game' && dialogIndex == 9) || dialogIndex === 0) {
      console.log(dialogIndex);
      setDisableBackBtn(true);
    } else {
      setDisableBackBtn(false);
    }

    // going back to the Game state will trigger the main theme song to play
    if (displayState == 'Game') {
      littleRoot.play();
      if (dialogIndex == -1) {
        dispatch(increment());
      }
      // delay the dialog box from popping up immediately
      const delayedDialog = setTimeout(() => {
        setDialogPos('-35%');
      }, 1500);
      return () => clearTimeout(delayedDialog);
    }
    // delay the dialog box from popping up immediately
    if (displayState == 'Battle') {
      const delayedDialog = setTimeout(() => {
        setDialogPos('-35%');
      }, 1500);
      return () => clearTimeout(delayedDialog);
    }
  }, [displayState, dialogIndex]);

  let delayedSpeech: any;
  const timer = (ms: any) => new Promise((res) => setTimeout(res, ms));

  // split the dialog text in the dialog array and then iterate through it to have a typing effect
  async function grabText() {
    let split = dialogMode == 'intro' ? gameDialog[dialogIndex].split('') : battleDialog[dialogIndex].split('');
    for (var i = 0; i < split.length; i++) {
      setVisibleDialog((oldArray: string[]) => [...oldArray, split[i]]);
      await timer(DIALOG_SPEED); // ideal speed is 30
    }
  }
  // determines how fast dialog pops up
  let popupSpeed = 2500;

  let audio = document.getElementById('battle-song') as HTMLAudioElement;
  if (audio) {
    audio.volume = 0.25;
  }
  useEffect(() => {
    // pause main song if entering the battle scene which is on dialogIndex 8
    if (dialogIndex == 8 && dialogMode == 'intro') {
      littleRoot.pause();
      // play battle song
      audio.play();
    }
    // if play won the battle pause the battle song
    if (dialogIndex == 6 && dialogMode == 'battle') {
      audio.pause();
    }
    // dialog pops up faster if it's not the first initial dialog pop up
    if (dialogIndex > 0) {
      popupSpeed = 1000;
    }
    // reset the visible dialog array to [] after it switches to new dialog array index
    setVisibleDialog([]);
    if (dialogIndex < 0) return;
    delayedSpeech = setTimeout(() => {
      grabText();
    }, popupSpeed);
    return () => clearInterval(delayedSpeech);
  }, [dialogIndex, dialogMode]);

  const traverseDialog = (direction: string) => {
    // increase dialog index by 1 if the next button is pushed
    if (dialogMode == 'intro') {
      if (direction == 'forward' && gameDialog[dialogIndex].split('').length == visibleDialog.length) {
        if (dialogIndex == gameDialog.length - 1) return;
        playSound(dialogSound);
        dispatch(increment());
      } else if (direction == 'backward' && gameDialog[dialogIndex].split('').length == visibleDialog.length) {
        if (dialogIndex == 0) return;
        playSound(dialogSound);
        dispatch(decrement());
      }
    }
    // increase dialog index by 1 if the next button is pushed
    if (dialogMode == 'battle') {
      if (direction == 'forward' && battleDialog[dialogIndex].split('').length == visibleDialog.length) {
        if (dialogIndex == battleDialog.length - 1) return;
        playSound(dialogSound);
        dispatch(increment());
      } else if (direction == 'backward' && battleDialog[dialogIndex].split('').length == visibleDialog.length) {
        if (dialogIndex == 0) return;
        playSound(dialogSound);
        dispatch(decrement());
      }
    }
  };
  // only triggers on the screen where player needs to pick their starter pokemon or if they are in battle and need to pick a move
  function waitingOnPlayer() {
    if ((dialogIndex == 5 && starterPokemonState?.name == null) || (dialogIndex >= 3 && dialogMode == 'battle') || dialogIndex == 14) {
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
      display: disableBackBtn ? 'none' : 'flex',
      color: 'black',
      position: 'absolute',
      bottom: '10%',
      left: '10%',
      zIndex: 99
    }
  };
  return (
    <Box sx={styles.dialogContainer}>
      <Typography align="left" fontSize={{ lg: 30, md: 20, sm: 18, xs: 14 }} sx={styles.dialogText}>
        {visibleDialog}
      </Typography>
      <AttackOptions />
      <Box component="img" src={dialogBox} sx={styles.dialogImgSrc} />
      <Button sx={styles.nextButton} onClick={() => traverseDialog('forward')}>
        {dialogIndex == 7 ? 'ready' : 'next'}
      </Button>

      <Button sx={styles.backButton} onClick={() => traverseDialog('backward')}>
        Prev
      </Button>
    </Box>
  );
}
