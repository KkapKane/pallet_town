import { createSlice } from '@reduxjs/toolkit';
import { PlayerState } from '../../types';

const initialState: PlayerState = {
  playerName: '',
  starterPokemon: null,
  chosenAttack: null
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    },
    setStarterPokemon: (state, action) => {
      state.starterPokemon = action.payload;
    },
    setChosenAttack: (state, action) => {
      state.chosenAttack = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPlayerName, setStarterPokemon, setChosenAttack } = playerSlice.actions;

export default playerSlice.reducer;
