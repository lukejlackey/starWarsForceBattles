import React from 'react'
import Character from './Character'

const Battle = () => {

    return (
        <div className='Battle'>
            <div className='Characters'>
                <Character charIdx={0} scheme='light' />
                <Character charIdx={1} scheme='dark' />
            </div>
        </div>
    )
}

export default Battle