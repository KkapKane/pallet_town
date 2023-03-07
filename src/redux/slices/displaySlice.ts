import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    value: "Home",
};

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
   switchDisplay: (state, action) => {
    state.value = action.payload
   },
   
  }
});

// Action creators are generated for each case reducer function
export const {switchDisplay} = displaySlice.actions;

export default displaySlice.reducer;
