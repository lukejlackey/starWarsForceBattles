import React, { useContext } from 'react'
import BodyContext from '../../BodyContext'
import Character from './Character'
import Results from './Results';

const Battle = () => {

    const { winPct } = useContext(BodyContext);


    return (
        <div className='Battle'>
            <div className='chars'>
                <Character charIdx={0} side='left' />
                <Character charIdx={1} side='right' />
            </div>
            <Results />
        </div>
    )
}

export default Battle