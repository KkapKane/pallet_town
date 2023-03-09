import { Box, Typography } from '@mui/material';
import pokeDexSvg from '../../assets/images/pokedex.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dark from '../../assets/backgroundTypes/dark.png';
import bug from '../../assets/backgroundTypes/bug.jpg';
import dragon from '../../assets/backgroundTypes/dragon.png';
import fairy from '../../assets/backgroundTypes/fairy.png';
import fighting from '../../assets/backgroundTypes/fighting.jpg';
import flying from '../../assets/backgroundTypes/flying.jpg';
import ice from '../../assets/backgroundTypes/ice.png';
import poison from '../../assets/backgroundTypes/poison.jpg';
import pyschic from '../../assets/backgroundTypes/psychic.png';
import { pokeDexContainer, pokemonGif, screen, mainPokeDexScreen, uiContainer, searchBox, btnStyle } from '../../Styles/pokeDexStyle';

interface IPokemonData {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
}

export default function PokeDexScreen() {
  const [input, setInput] = useState('');
  const [gif, setGif] = useState('');
  const [pokeData, setPokeData] = useState<IPokemonData | undefined>();
  const [currentBG, setCurrentBG] = useState('');

  // fetches data from pokemon api by string name
  async function grabPokemon(name: string) {
    if (name == '') return;
    try {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokeData(response.data);
      setGif(response.data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']);

      setBG(response.data.types[0].type.name);
    } catch (error) {
      console.log(error);
    }
  }
  // fetches data from pokemon api from id
  async function grabPokemonByID(id: number) {
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokeData(response.data);
    setGif(response.data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']);
    setBG(response.data.types[0].type.name);
  }

  // rolls a random number from 0 - 500 and fetch from api using that number as the ID
  async function grabRandomPokemon() {
    let randomNumber = Math.floor(Math.random() * 500);

    grabPokemonByID(randomNumber);
  }

// determines which background is shown behind the pokemon in the pokedex by their type
  function setBG(type: string | undefined) {
    switch (type) {
      case 'rock':
        setCurrentBG(dragon);
        break;
      case 'bug':
        setCurrentBG(bug);
        break;
      case 'dark':
        setCurrentBG(dark);
        break;
      case 'dragon':
        setCurrentBG(dragon);
        break;
      case 'fairy':
        setCurrentBG(fairy);
        break;
      case 'fighting':
        setCurrentBG(fighting);
        break;
      case 'ice':
        setCurrentBG(ice);
        break;
      case 'poison':
        setCurrentBG(poison);
        break;
      case 'flying':
        setCurrentBG(flying);
        break;
      case 'grass':
        setCurrentBG(bug);
        break;
      case 'electric':
        setCurrentBG(pyschic);
        break;
      case 'unknown':
        setCurrentBG(pyschic);
        break;
      case 'ghost':
        setCurrentBG(dark);
        break;
      case 'shadow':
        setCurrentBG(dark);
        break;
      case 'ground':
        setCurrentBG(dragon);
        break;
      case 'fire':
        setCurrentBG(bug);
        break;
      case 'steel':
        setCurrentBG(dragon);
        break;
      case 'water':
        setCurrentBG(bug);
        break;
      default:
        setCurrentBG(bug);
    }
  }

  const style = {
    mainPokeDexScreen: mainPokeDexScreen(),
    pokeDexContainer: pokeDexContainer(),
    screen: screen(currentBG),
    pokemonGif: pokemonGif(),
    uiContainer: uiContainer(),
    searchBox: searchBox(),
    btnStyle: btnStyle()
  };

  return (
    <Box sx={style.mainPokeDexScreen}>
      <Box sx={style.pokeDexContainer}>
        <Box component="img" src={pokeDexSvg} />
        {pokeData ? (
          <Box sx={style.screen}>
            <Box component="img" src={gif} sx={style.pokemonGif} />
            <div style={{ backgroundColor: 'rgba(0,0,0,.5)', width: '100%', textAlign: 'center', fontFamily: 'Silkscreen' }}>
              <Typography>{pokeData?.name.toUpperCase()}</Typography>
              <Typography>{pokeData?.types[0].type.name.toUpperCase()} TYPE</Typography>
              <Typography>HEIGHT: {pokeData?.height} ft</Typography>
              <Typography>WEIGHT: {pokeData?.weight} lbs</Typography>
            </div>
          </Box>
        ) : null}
        <Box sx={style.uiContainer}>
          <input style={style.searchBox} type="text" onChange={(e) => setInput(e.target.value)} placeholder="Pokemon Name" />
          <button style={style.btnStyle} onClick={() => grabPokemon(input.toLocaleLowerCase())}>
            Search
          </button>
          <button style={style.btnStyle} onClick={() => grabRandomPokemon()}>
            Generate Random
          </button>
        </Box>
      </Box>
    </Box>
  );
}
