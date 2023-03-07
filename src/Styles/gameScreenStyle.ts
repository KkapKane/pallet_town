
type OakType = {
    oak1: string,
    oak2: string
}

export const getMainScreenStyle = (displayState: string, oakPos: OakType) => ({
   display: displayState == 'Home' || displayState == "Battle" ? 'none' : 'flex',
   flexDirection: 'column',
   position: 'absolute',
   top: '0%',
   left: oakPos.oak1,
   justifyContent: 'center',
   alignItems: 'center',
   height: '100vh',
   width: '100vw'
 });

 export const getOak1Style = (dialogState: number) => ({
   display: dialogState >= 2 ? 'none' : 'flex',
   position: 'absolute',
   scale: 2,
   top: '20%',
   transition: '2000ms'
 });

 export const getOak2Style = (dialogState: number, oakPos:OakType) => ({
   display: dialogState < 2 ? 'none' : 'flex',
   position: 'absolute',
   top: { lg: '25%', md: '40%', sm: '40%', xs: '48%' },
   left: oakPos.oak2,
   transition: '1000ms',
   height: { lg: '80%', md: '70%', sm: '60%', xs: '68%' }
 });

 export const getPokemonContainerStyle = () => ({
   display: 'flex',
   justifyContent: 'space-around',
   alignItems: 'center',
   position: 'absolute',
   width: { lg: '80%', md: '70%', sm: '100%', xs: '100%' },
   top: '10%'
 });

 export const getGridLayoutStyle = () => ({
   position: 'absolute',
   top: 0,
   display: 'flex',
   flexWrap: 'wrap'
 });