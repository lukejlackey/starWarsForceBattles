import React, { useContext } from 'react'
import BodyContext from '../../BodyContext'

const Results = () => {

    const { winPct, handleNext } = useContext(BodyContext);

    return (
        <div className='Results'>
            {
                winPct === null ?
                    '' :
                    <h2>
                        {
                            winPct === "New" ?
                                'You are the first vote!' :
                                `${winPct}% of others agreed with you.`
                        }
                    </h2>
            }
            <button onClick={handleNext} className='Next' disabled={winPct === null}>NEXT</button>
        </div>
    )
}

export default Results