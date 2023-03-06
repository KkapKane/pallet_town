import { Box, Button, Container, Link, List, ListItem, ListItemText } from '@mui/material';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useGetPokemonByNameQuery } from '../../redux/pokemonService';

// export interface InstructionsProps {}
const Instructions = () => {
  const { data, isFetching } = useGetPokemonByNameQuery('charizard');
  const onGo = useCallback(() => {
    toast.success("Ok, let's do it!");
  }, []);
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemText
            primary="Objective"
            secondary={
              <>
                Implement a small multistep wizard utilzing the <Link href="https://pokeapi.co/">Pokemon API</Link>. The wizard can do anything you want, but should make atleast one API call, and
                utilize the data in the wizard some how. Charizard's first move is 👊 {isFetching ? '?' : data?.moves?.[0]?.move?.name}! We'll be looking at your creativity, use of material-ui, state
                management, api utilization, typescript, and core react principles.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Requirements"
            secondary="Submissions must start & run without any errors, check the console before you submit! The app must contain multiple pages and move between them with next, back, etc."></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText primary="Extra Credit" secondary="Install and configure ESLINT, or any other developer tools that enrich the project."></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText primary="Submitting" secondary="Commit your work directly to github, share a link with us when you are done!"></ListItemText>
        </ListItem>
      </List>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Button color="secondary" variant="contained" onClick={onGo}>
          Lets Go!
        </Button>
      </Box>
    </Container>
  );
};
export default Instructions;
