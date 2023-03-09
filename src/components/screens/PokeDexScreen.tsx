import {Box, TextField, Button, Typography} from "@mui/material"
import pokeDexSvg from "../../assets/pokedex.svg"
import {useState, useEffect} from 'react'
import axios from "axios";
import bg from "../../assets/background.jpg"

export default function PokeDexScreen() {
    const [input, setInput] = useState('')
    const [gif, setGif] = useState('')
    const [pokeData,setPokeData] = useState()

    async function grabPokemon(name:string) {
        try {
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)            
            setPokeData(response.data)
            setGif(response.data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']);
            
        }catch(error) {
            console.log(error)
        }
    }
    async function grabPokemonByID(id: number){
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokeData(response.data)
        setGif(response.data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']);
    }
   
    async function grabRandomPokemon(){
        let randomNumber = Math.floor(Math.random() * 500);
       
        grabPokemonByID(randomNumber)
    }

    useEffect(() => {
        console.log(pokeData)
    },[pokeData])

    return (
      <Box sx={style.mainPokeDexScreen}>
        <Box sx={style.pokeDexContainer}>
          {pokeData ? (
            <Box sx={style.screen}>
              <Box component="img" src={gif} sx={style.pokemonGif} />
              <Typography >{pokeData?.name.toUpperCase()}</Typography>
              <Typography >{pokeData?.types[0].type.name.toUpperCase()} TYPE</Typography>
              <Typography >HEIGHT: {pokeData?.height} ft</Typography>
              <Typography >WEIGHT: {pokeData?.weight} lbs</Typography>
            </Box>
          ) : null}
          <Box component="img" src={pokeDexSvg} />
        </Box>

        <Box sx={style.uiContainer}>
        <input style={style.searchBox} type="text" onChange={(e) => setInput(e.target.value)} placeholder="Pokemon Name"/>
        <button style={style.buttonStyle} onClick={() => grabPokemon(input.toLocaleLowerCase())}>
          Search
        </button>
        <button style={style.buttonStyle} onClick={() => grabRandomPokemon()}>
          Generate Random
        </button>
        </Box>
      </Box>
    );
}

const style = {
    mainPokeDexScreen: {
        display: "flex",
        height: "100%",

     

    },
    pokeDexContainer: {
        position: "absolute",    
        bottom: "0%"

    },
    buttonStyle: {
        
    
 
    },
    pokemonGif: {
        height: "50%",
        position: "absolute",
        top: "38%",
        left: "24%"
    },
    
    screen: {
        color: "white",
        display:"flex",
        // justifyContent: "top",
        gap: "4px",
        alignItems: "center",
        position: "absolute",
        textAlign: "left",
        right: "35%",
        height: "39%",
        width: "28%",
        top: "24%",
        border: "4px solid black",
        flexDirection: "column",
        background: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    uiContainer: {
        display: "flex",
        
        
        position:"absolute",
        width: "30%",
        height: "4%",
        border: "1px solid black",
        bottom: "10%",
        right: "20%"
    },
    searchBox: {
        width: "100%"
    }
}