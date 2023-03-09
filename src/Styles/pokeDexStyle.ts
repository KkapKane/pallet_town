export const mainPokeDexScreen = () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden'
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
  height: '60px',
  width: { lg: '70%', md: '.7', sm: '60%', xs: '60%' },
  border: '1px solid black'
});

export const searchBox = () => ({
  fontSize: '2rem',
  width: '100%'
});

export const btnStyle = () => ({
  fontSize: '1.1rem',
  width: '100%',
  scale: 1
});
