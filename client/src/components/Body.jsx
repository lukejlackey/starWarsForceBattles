import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BodyContext from '../BodyContext';
import Battle from './body/Battle';

const Body = () => {

    const [pool, setPool] = useState([]);
    const [chars, setChars] = useState([]);
    const [winner, setWinner] = useState('None');
    const [winPct, setWinPct] = useState('None');

    useEffect(() => {
        fetchPool();
    }, [])

    const fetchPool = () => {
        axios.get('https://swapi.dev/api/people/')
            .then(res => {
                console.log(res);
                setPool(shuffleAndPickChars(res.data.results));
            })
            .catch(err => {
                console.error(err);
            })
    }

    const shuffleAndPickChars = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        setChars([array[0], array[1]])
        return array;
    }

    const handleVote = (e, charIdx) => {
        e.preventDefault();
        if (e.target.value == charIdx) {
            setWinner(charIdx);
            recordResult(chars[charIdx], chars[Math.abs(charIdx - 1)]);
        }
    }

    const handleNext = (e) => {
        if (winPct) {
            setWinPct('None');
            setWinner('None');
            shuffleAndPickChars(pool);
        }
    }


    const recordResult = (winner, loser) => {
        axios.post('http://localhost:8000/api/battle/new',
            { winner: winner.name, loser: loser.name }
        )
            .then(res => {
                console.log(res);
                let records = res.data.result.opponents;
                let wins = getWins(records, winner.name);
                let losses = getWins(records, loser.name);
                setWinPct(calcWinPct(wins, losses));
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getWins = (data, name) => {
        const wins = data
            .filter((record) => record.name == name)
            .map((record) => record.wins)[0];
        return wins != undefined ? wins : 0;
    }

    const calcWinPct = (wins, losses) => {
        if (!wins && !losses) return "New";
        if (!losses) return 100;
        return ((wins / (wins + losses)) * 100).toPrecision(3);
    }

    return (
        <div className='Body'>
            <BodyContext.Provider
                value={
                    {
                        pool: pool,
                        chars: chars,
                        shuffleAndPickChars: shuffleAndPickChars,
                        winner: winner,
                        setWinner: setWinner,
                        winPct: winPct,
                        setWinPct: setWinPct,
                        handleVote: handleVote,
                        handleNext: handleNext
                    }
                }
            >
                <h2>Who would win?</h2>
                {
                    (pool.length > 0) ?
                        <Battle /> :
                        <h2>Loading...</h2>
                }
            </BodyContext.Provider>
        </div>
    )
}

export default Body