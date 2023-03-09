export const mainPokeDexScreen = () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
  
});

export const pokeDexContainer = () => ({
  margin: 0,
  padding: 0,
  bottom: '0%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  left: { lg: '10%', md: '-20%', sm: '-51%', xs: '-78%' },
  scale: { lg: '.7', md: '.5', sm: '.7', xs: '.6' }
});

export const pokemonGif = () => ({
  height: '50%',
  transform: 'translateY(-20%)'
});

export const screen = (currentBG: string) => ({
  color: 'white',
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  textAlign: 'left',
  height: '35%',
  width: '26.5%',
  right: '36%',
  top: '23.5%',
  border: '4px solid black',
  flexDirection: 'column-reverse',
  background: `url(${currentBG})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
});

export const uiContainer = () => ({
  display: 'flex',
  // flexWrap: { lg: "80%", md: "no-wrap", sm: "wrap", xs: "wrap" },
  height: { lg: 70, md: 70, sm: 80, xs: 100 },
  fontSize: '2rem',
  width: { lg: '70%', md: '70%', sm: '60%', xs: '40%' },
  border: '4px solid black'
});

export const searchBox = () => ({
    fontFamily: "Silkscreen",
    fontSize: '1.5rem',
    width: '100%',
  
});

export const btnStyle = () => ({
  fontFamily: 'Silkscreen',
  color: 'black',
  fontSize: '1.5rem',
  width: '50%',
 
  backgroundColor: '#39b549',
  border: '1px solid black',
  lineHeight: '1.2ch',
  cursor: "pointer"
});

export const labels = () => ({
  fontFamily: 'Silkscreen',
  fontSize: "1.2rem",
});
