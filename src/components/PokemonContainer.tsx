import { getPokemonContainerStyle } from "../Styles/gameScreenStyle";
import { Box } from '@mui/material';
import { Pokemon } from './Pokemon';

import { HiOutlineArrowRight } from 'react-icons/hi';
interface Props {
dialogIndex: number,

}

const styles = {
    pokemonContainer: getPokemonContainerStyle()
}

export default function PokemonContainer ({dialogIndex} : Props) {
const starterPokemon = ['charmander', 'squirtle', 'bulbasaur'];
const evolutionExample = ['charmander', 'charmeleon', 'charizard'];

  if (dialogIndex === 2 || dialogIndex === 5) {
    return (
      <Box sx={styles.pokemonContainer}>
        {starterPokemon.map((pokemon) => {
          return <Pokemon name={pokemon} />;
        })}
      </Box>
    );
  } else if (dialogIndex === 3) {
    return (
      <Box sx={styles.pokemonContainer}>
        {evolutionExample.map((pokemon, index) => {
          return (
            <>
            {/* if it's the pokemon on the very right of the screen don't put arrow next to it */}
              {index === evolutionExample.length - 1 ? (
                <Pokemon name={pokemon} />
              ) : (
                <>
                  {' '}
                  <Pokemon name={pokemon} /> <HiOutlineArrowRight />{' '}
                </>
              )}
            </>
          );
        })}
      </Box>
    );
  } else {
    return null;
  }
};