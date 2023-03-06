import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import dialogBox from '../../assets/dialogBox.png';
import { useState, useEffect } from 'react';
import { increment, decrement } from '../../redux/slices/dialogSlice';

export default function Dialog() {
  const [dialogPos, setDialogPos] = useState('-100%');

  const playerState = useSelector((state: RootState) => state.player.PlayerName);
  const displayState = useSelector((state: RootState) => state.display.value);
  const dialogState = useSelector((state: RootState) => state.dialogIndex.index);
  const dispatch = useDispatch();
  const gameDialog = [
    `Hello ${playerState}, my name is Oak. People usually call me Professor Oak.`,
    'Today , I will be teaching you about the world of Pokemon',
    'Each Pokemon has an affinity such as fire, water, grass, etc...'
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



  const traverseDialog = (direction: string) => {
    if (direction == 'forward') {
      dispatch(increment());
    } else if (direction == 'backward') {
      dispatch(decrement());
    }
  };

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
      <Typography fontSize={{ lg: 30, md: 20, sm: 30, xs: 18}} sx={styles.dialogText} align="center">
        {gameDialog[dialogState]}
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
