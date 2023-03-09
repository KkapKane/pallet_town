import { useGetPokemonByNameQuery } from '../redux/pokemonService';
import { setStarterPokemon } from '../redux/slices/playerSlice';
import type { RootState } from '../redux/store';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const Pokemon = ({ name }: { name: string }) => {
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(name, {});

  const dispatch = useDispatch();
  const dialogIndex = useSelector((state: RootState) => state.dialog.index);
  const starterPokemonState = useSelector((state: RootState) => state.player.starterPokemon);
  const [isSelected, setIsSelected] = useState<string | undefined | null>(null);

  const selectPokemon = (name: string | undefined) => {
    if (!data) return;
    dispatch(setStarterPokemon(data));
    setIsSelected(name);
  };

  const styles = {
    pokemonContainer: {
      display: 'flex',
      //when a player clicks on a pokemon to select it, set a border around it to indicate it's selected
      border: isSelected === starterPokemonState?.name ? '3px solid green' : '1px solid white'
    },
    pokemonImage: {
      height: { lg: '200px', md: '200px', sm: '200px', xs: '150px' }
    },
    pokemonLabel: {
      fontSize: { lg: '40px', md: '35px', sm: '30px', xs: '12px' }
    },
    pokemonLabel2: {
      display: dialogIndex === 2 ? 'flex' : 'none',
      fontSize: { lg: '30px', md: '25px', sm: '20px', xs: '20px' }
    }
  };

  return (
    <Box sx={styles.pokemonContainer} onClick={() => selectPokemon(data?.species.name)}>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box component="img" src={data.sprites.front_default} alt={data.species.name} sx={styles.pokemonImage} />
          <Typography sx={styles.pokemonLabel}>
            {data.species.name.toUpperCase()} {isFetching ? '...' : ''}
          </Typography>
          <Typography sx={styles.pokemonLabel2}>
            {data.types[0].type.name.toUpperCase()} {isFetching ? '...' : ''}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
