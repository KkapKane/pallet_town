import { createSlice } from '@reduxjs/toolkit';


export interface DialogState {
  index: number;
}

const initialState: DialogState = {
  index: -1
};

export const dialogSlice = createSlice({
  name: 'dialogIndex',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.index += 1;
    },
    decrement: (state) => {
      state.index -= 1;
    },
    
    
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = dialogSlice.actions;

export default dialogSlice.reducer;
