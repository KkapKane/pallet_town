import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Button, Box } from "@mui/material";
import {useState, useEffect} from 'react';
import { setChosenAttack } from "../../redux/slices/playerSlice";
import { increment } from "../../redux/slices/dialogSlice";

export default function AttackOptions() {
    const starterPokemonState = useSelector((state: RootState) => state.player.starterPokemon);
    const { index: dialogIndex, mode: dialogMode } = useSelector((state: RootState) => state.dialog);
    const [showAttackOptions, setShowAttackOptions] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        judgement()
    }, [dialogIndex])

    function judgement() {
        if(dialogIndex == 3 && dialogMode == "battle") {
            setShowAttackOptions(true) 
        }
        else if (dialogIndex == 5 && dialogMode == "battle"){
            setShowAttackOptions(false)
        }
    }

    function setAttack(attackName: string) {
        setShowAttackOptions(false)
        dispatch(setChosenAttack(attackName))
        dispatch(increment())
    }
    const styles: any = {
        attackOptionContainer: {
            display: showAttackOptions ? "flex" : "none",
            
            position: "absolute",
            
            justifyContent: "space-between",
            flexWrap: "wrap",
            top: "20%",
            width: "84%",
            height: "70%",
            
            zIndex: 99
        },
        individualAttack: {
            display: "flex",
            
            color: "black",
            flexWrap: 1,
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            height: "50%",
            fontSize: { lg : "2rem" , md: "1rem", sm: "1rem" , xs: "1rem"}
            
        }
    }
    return (
      <Box sx={styles.attackOptionContainer}>
        <Button variant="contained" onClick={() => setAttack(starterPokemonState?.moves[0].move.name.toUpperCase())} sx={styles.individualAttack}>{starterPokemonState?.moves[0].move.name.toUpperCase()}</Button>
        <Button variant="contained" onClick={() => setAttack(starterPokemonState?.moves[1].move.name.toUpperCase())} sx={styles.individualAttack}>{starterPokemonState?.moves[1].move.name.toUpperCase()}</Button>
        <Button variant="contained" onClick={() => setAttack(starterPokemonState?.moves[2].move.name.toUpperCase())} sx={styles.individualAttack}>{starterPokemonState?.moves[2].move.name.toUpperCase()}</Button>
        <Button variant="contained" onClick={() => setAttack(starterPokemonState?.moves[3].move.name.toUpperCase())} sx={styles.individualAttack}>{starterPokemonState?.moves[3].move.name.toUpperCase()}</Button>
      </Box>
    );
}

