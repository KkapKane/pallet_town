import { useGetPokemonByNameQuery } from "../redux/pokemonService"
import { Box, Typography } from '@mui/material';
export const Pokemon = ({ name }: { name: string }) => {
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(name, {
    
  });

  return (
    <Box sx={styles.pokemonContainer}>

      {error ? (
          <>Oh no, there was an error</>
          ) : isLoading ? (
              <>Loading...</>
              ) : data ? (
                  <Box sx={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
          <Box component="img" src={data.sprites.front_default} alt={data.species.name} sx={styles.pokemonImage}/>
          <Typography sx={styles.pokemonLabel}>
            {data.species.name} {isFetching ? '...' : ''}
          </Typography>
        </Box>
      ) : null}
      </Box>
  );
};

const styles = {
    pokemonContainer: {
        display: 'flex',
        border: "1px solid black"
    },
  pokemonImage: {
    height: { lg: '200px', md: '200px', sm: '200px', xs: '150px' }
  },
  pokemonLabel: {
    fontSize: {lg: "40px", md: "35px", sm: "30px", xs: "30px"}
  }
};