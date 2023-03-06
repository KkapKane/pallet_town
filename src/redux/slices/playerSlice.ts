import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  PlayerName: ''
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerName: (state, action) => {
      state.PlayerName = action.payload}
  }
});

// Action creators are generated for each case reducer function
export const { setPlayerName } = playerSlice.actions;

export default playerSlice.reducer;
