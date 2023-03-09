import { getPokemonContainerStyle } from '../Styles/gameScreenStyle';
import { Box } from '@mui/material';
import { Pokemon } from './Pokemon';

import { HiOutlineArrowRight } from 'react-icons/hi';
interface Props {
  dialogIndex: number;
}

const styles = {
  pokemonContainer: getPokemonContainerStyle()
};

export default function PokemonContainer({ dialogIndex }: Props) {
  const starterPokemon = ['charmander', 'squirtle', 'bulbasaur'];
  const evolutionExample = ['charmander', 'charmeleon', 'charizard'];

  // if the dialog index is 2 or 5 that means it should show the starter pokemon list
  // index 2 is when it shows examples of pokemon and their types
  // index 5 is when it prompts user to pick their starter pokemon
  if (dialogIndex === 2 || dialogIndex === 5) {
    return (
      <Box sx={styles.pokemonContainer}>
        {starterPokemon.map((pokemon, index) => {
          return <Pokemon name={pokemon} key={index + pokemon} />;
        })}
      </Box>
    );
    // index 3 is when it shows example of pokemon evolutions so it should map through the evolution array
  } else if (dialogIndex === 3) {
    return (
      <Box sx={styles.pokemonContainer}>
        {evolutionExample.map((pokemon, index) => {
          return (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: { lg: '80%', md: '70%', sm: '100%', xs: '100%' } }}>
              {/* if it's the pokemon on the very right of the screen don't put arrow next to it */}
              {index === evolutionExample.length - 1 ? (
                <Pokemon name={pokemon} key={index + pokemon + index} />
              ) : (
                <>
                  {' '}
                  <Pokemon name={pokemon} key={index * 12} /> <HiOutlineArrowRight />{' '}
                </>
              )}
            </Box>
          );
        })}
      </Box>
    );
  } else {
    return null;
  }
}
