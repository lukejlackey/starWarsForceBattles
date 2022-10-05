import axios from 'axios';
import React, { useContext, useState } from 'react'
import BodyContext from '../../BodyContext';

const Character = (props) => {

    const { charIdx, side } = props;

    const { chars, winner, handleVote } = useContext(BodyContext);

    const determineClass = () => {
        if (winner === 'None') return '';
        return winner === charIdx ? 'Winner' : 'Loser';
    }

    return (
        <>
            < button
                className={`char ${side} ${determineClass()}`}
                value={charIdx === 0 || charIdx === 1 ? charIdx : 'None'}
                onClick={(e) => handleVote(e, charIdx)}
                disabled={winner != 'None'}
            >
                {chars[charIdx] ? chars[charIdx].name : ''}
            </button>
        </>
    )
}

export default Character