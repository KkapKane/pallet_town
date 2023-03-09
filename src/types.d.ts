export type MewState = {
  HP: number;
  takenDmg: boolean;
  show: boolean;
};

export type OakPosState = {
  leftPos: string;
  oakOpacity: string;
  hide: boolean;
};

export type PlayerPokemonStyleState = {
  opacity: string;
};

export type pokeDexState = {
  show: boolean;
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  moves: any;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    back_default?: string;
  };
}

export type PlayerState = {
  playerName: string;
  starterPokemon: Pokemon | null;
  chosenAttack: string | null;
}