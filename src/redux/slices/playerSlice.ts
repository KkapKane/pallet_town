import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  PlayerName: '',
  starterPokemon: ''
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerName: (state, action) => {
      state.PlayerName = action.payload},
    setStarterPokemon: (state, action) => {
      state.starterPokemon = action.payload}
  },
});

// Action creators are generated for each case reducer function
export const { setPlayerName, setStarterPokemon } = playerSlice.actions;

export default playerSlice.reducer;
