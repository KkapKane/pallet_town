import {Box} from '@mui/material'
import {useEffect, useState} from 'react';
import professorOak from '../../assets/professorOak.png'
import { useDispatch } from 'react-redux';
import { switchMode } from '../../redux/slices/dialogSlice';
import Dialog from '../gameMechanics/Dialog';

export default function BattleScreen() {

const [oakPos, setOakPos] = useState({leftPos:"-10%", oakOpacity: "100%"})

const dispatch = useDispatch();

    useEffect(() => {
    
    dispatch(switchMode("battle"))
    setTimeout(() =>{

        setOakPos({...oakPos, leftPos: "80%"})
    },1000)  
      

    }, [])

    const styles = {
      battleContainer: {
        backgroundColor: "red",
        display: "flex",
        flexDirection: 'column',
        position: 'absolute',
        top: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      },
      oak: {
        position: 'absolute',
        top: "0%",
        left: oakPos.leftPos,
        transition: '3000ms'
      }
    };
    return (
        <Box sx={styles.battleContainer}>
            <Box component="img" src={professorOak} sx={styles.oak}/>
            <Dialog />
        </Box>
    )
}
