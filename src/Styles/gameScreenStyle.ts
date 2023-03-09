
import type { pokeDexState } from "../types";
import { keyframes } from '@mui/system';
type OakType = {
    oak1: string,
    oak2: string
}

export const getMainScreenStyle = (displayState: string, oakPos: OakType) => ({
   display: displayState == 'Home' || displayState == "Battle" || displayState == "PokeDex" ? 'none' : 'flex',
   flexDirection: 'column',
   position: 'absolute',
   top: '0%',
   left: oakPos.oak1,
   justifyContent: 'center',
   alignItems: 'center',
   height: '100vh',
   width: '100vw',
  
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

const float = keyframes`
   0% { transform: translate(0,  0%); }
    50%  { transform: translate(0, 8%); }
    100%   { transform: translate(0, -0%); }  
`;

 export const getPokeDexStyle = (pokeDexState: pokeDexState) => ({
   display: pokeDexState.show == true ? 'flex' : 'none',
   position: 'absolute',
   top: '10%',
   scale: { lg: '80%', md: '70%', sm: '50%', xs: '50%' },
   animation: `${float} 3s infinite cubic-bezier(.5, 0, .5, 1)`
 });

 export const getArrowStyle = (dialogIndex: number) => ({
   position: 'absolute',
   display: dialogIndex == 14 ? 'block' : 'none',
   top: { lg: '15%', md: '5%', sm: '10%', xs: '10%' },
   right: { lg: '18%', md: '25%', sm: '25%', xs: '25%' },
   transform: { lg: 'rotate(20deg)', md: 'rotate(5deg)', sm: 'rotate(-20deg)', xs: 'rotate(0deg)' },
   zIndex: 99,
   scale: { lg: '100%', md: '70%', sm: '50%', xs: '50%' }
 });

export const getClickMeStyle = (dialogIndex: number) => ({
  display: dialogIndex == 14 ? 'block' : 'none',
  fontSize: { lg: '2rem', md: '2rem', sm: '1rem', xs: '1rem' },
  zIndex: 99,
  position: 'absolute',
  top: { lg: '28%', md: '13%', sm: '15%', xs: '18%' },
  right: { lg: '14%', md: '20%', sm: '26%', xs: '30%' }
});