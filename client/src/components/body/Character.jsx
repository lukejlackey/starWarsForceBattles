import React, { useContext } from 'react'
import { useSpring, animated } from 'react-spring'
import BodyContext from '../../BodyContext';

const Character = (props) => {
    
    const { charIdx, scheme } = props;

    const { chars, handleVote, schemes, voted } = useContext(BodyContext);

    const colorScheme = schemes[scheme];
    const character = chars[charIdx];
    
    const barHeight = useSpring({ 
        to: { height: character.winPct? `${parseFloat(character.winPct) / 5}rem`: `0rem` },
        from: { height: `0rem` },
    })
    
    return (
        <div className='Character'>
            <div className='BarContainer'>
                <animated.div className={`WinPctBar`} style={{ backgroundColor: colorScheme['color'],...barHeight}} >{(voted)? `${character.winPct}%` : ''}</animated.div>
            </div>
            <button
                className='NameButton'
                style={{color:colorScheme['color']}}
                value={charIdx === 0 || charIdx === 1 ? charIdx : null}
                onClick={(e) => handleVote(e, charIdx, colorScheme)}
                disabled={voted}
            >
                {character ? character.name : ''}
            </button>
            {
                (voted)?
                <p style={{color: colorScheme['color']}}>{character.voters} of {character.votersTotal} other voters {character.winner?'':'dis'}agree{character.voters === 1? 's':''} with you</p>:''
            }
        </div>
    )
}

export default Character