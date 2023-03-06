import { useGetPokemonByNameQuery } from "../redux/pokemonService"
import { setStarterPokemon } from "../redux/slices/playerSlice";
import type { RootState } from "../redux/store"
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
export const Pokemon = ({ name }: { name: string }) => {
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(name, {
    
  });
  const dispatch = useDispatch();
  const dialogState = useSelector((state: RootState) => state.dialogIndex.index);
    const showAffinity = () => {
      if (dialogState == 2) {
        return 'flex';
      } else {
        return 'none';
      }
    };
    const highlightChoice = () => {
      if(dialogState == 5){
        return {
          outline: "1px solid black",
          backgroundColor: "lightGray"
        }
      }
    }

   
  const styles = {
    pokemonContainer: {
      display: 'flex',
      "&:hover" : () => highlightChoice(), 
      },
    pokemonImage: {
      height: { lg: '200px', md: '200px', sm: '200px', xs: '150px' }
    },
    pokemonLabel: {
      fontSize: {lg: "40px", md: "35px", sm: "30px", xs: "12px"}
    },
    pokemonLabel2: {
      display: () => showAffinity(),
      fontSize: {lg: "30px", md: "25px", sm: "20px", xs: "20px"}
    }
  };
  return (
    <Box sx={styles.pokemonContainer}>

      {error ? (
        <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
          ) : data ? (
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
          <Box component="img" src={data.sprites.front_default} alt={data.species.name} sx={styles.pokemonImage} onClick={() => dispatch(setStarterPokemon(data.species.name))}/>
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
