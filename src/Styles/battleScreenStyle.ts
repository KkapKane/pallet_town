import type { OakPosState, MewState, PlayerPokemonStyleState } from '../types';

export const getBattleContainerStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '0%',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  overFlow: "hidden"
  
});

export const getOakStyle = (oakPos: OakPosState) => ({
  display: oakPos.hide == true ? 'none' : 'flex',
  position: 'absolute',
  top: '0%',
  opacity: oakPos.oakOpacity,
  left: oakPos.leftPos,
  transition: '3000ms',
  scale: { lg: 1, md: 1, sm: 0.6, xs: 0.6 }
});

export const getMewStyle = (mewState: MewState) => ({
  display: mewState.show == true ? 'flex' : 'none',
  filter: mewState.takenDmg == true ? 'brightness(200%)' : 'brightness(100%)',
  position: 'absolute',
  right: { lg: '8%', md: '2%', sm: '4%', xs: '0%' },
  top: 0,
  height: { lg: 340, md: 300, sm: 250, xs: 250 }
});

export const getPlayerPokemonStyle = (playerPokemonStyle: PlayerPokemonStyleState) => ({
  position: 'absolute',
  left: { lg: '4%', md: '4%', sm: '-10%', xs: '-20%' },
  bottom: '20%',
  height: 400,
  opacity: playerPokemonStyle.opacity,
  transition: '1000ms'
});

export const getHPContainerStyle = (mewState: MewState) => ({
  display: mewState.show === true ? 'flex' : 'none',
  position: 'absolute',
  top: '30%',
  right: '10%'
});

export const getHPBarStyle = () => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: { lg: 400, md: 300, sm: 250, xs: 250 },
  height: '10px',
  border: '1px solid black'
});

export const getHPFillStyle = (mewState: MewState) => ({
  width: mewState.HP == 0 ? '0%' : `${mewState.HP}%`,
  height: '10px',
  backgroundColor: 'green',
  zIndex: 99
});
