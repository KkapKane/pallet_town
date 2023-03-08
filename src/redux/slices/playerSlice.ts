import { createSlice } from '@reduxjs/toolkit';

interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  moves: any
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  types: {
    type: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
  sprites: {
    front_default: string;
    front_shiny?: string;
    front_female?: string;
    front_shiny_female?: string;
    back_default?: string;
    back_shiny?: string;
    back_female?: string;
    back_shiny_female?: string;
  };
}

interface PlayerState {
  playerName: string;
  starterPokemon: Pokemon | null ;
  chosenAttack: string | null
}

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
      state.chosenAttack = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPlayerName, setStarterPokemon, setChosenAttack } = playerSlice.actions;

export default playerSlice.reducer;
