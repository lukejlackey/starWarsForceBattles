import React, { useContext } from 'react'
import BodyContext from '../../BodyContext';

const Character = (props) => {

    const { charIdx, side } = props;

    const { chars, winner, handleVote } = useContext(BodyContext);

    const determineClass = () => {
        if (winner === null) return '';
        return winner === charIdx ? 'Winner' : 'Loser';
    }

    return (
        <>
            < button
                className={`char ${side} ${determineClass()}`}
                value={charIdx === 0 || charIdx === 1 ? charIdx : null}
                onClick={(e) => handleVote(e, charIdx)}
                disabled={winner != null}
            >
                {chars[charIdx] ? chars[charIdx].name : ''}
            </button>
        </>
    )
}

export default Character