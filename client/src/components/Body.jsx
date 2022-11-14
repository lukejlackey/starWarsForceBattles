import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring'
import axios from 'axios';
import BodyContext from '../BodyContext';
import Battle from './body/Battle';
import linkedin from '../images/linkedin.png';
import github from '../images/github.png';

const Body = () => {

    const schemes = {
        neutral:{
            boxShadow: '0 -10px 100px 0 #b976efb6',
            backgroundColor: '#1e0c33',
            color: '#e3befbcb'
        },
        light: {
            boxShadow: '0 -10px 100px 0 #7688efb6',
            backgroundColor: '#141650',
            color: '#a19ffecb'
        },
        dark: {
            boxShadow: '0 -10px 100px 0 #ef7676b6',
            backgroundColor: '#330c0c',
            color: '#f58585cb'
        }
    };

    const [pool, setPool] = useState([]);
    const [chars, setChars] = useState([]);
    const [voted, setVoted] = useState(false);
    const [colorScheme, setColorScheme] = useState(schemes['neutral']);

    useEffect(() => {
        fetchPool();
    }, []);

    const bg = useSpring({ 
        from: schemes['neutral'],
        to: colorScheme,
    });
    

    const fetchPool = () => {
        axios.get('https://swapi.dev/api/people/')
            .then(res => {
                console.log(res);
                setPool(shuffleAndPickChars(res.data.results));
            })
            .catch(err => {
                console.error(err);
            })
    };

    const shuffleAndPickChars = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        array[0].winPct = null;
        array[0].winner = null;
        array[1].winPct = null;
        array[1].winner = null;
        setChars([array[0], array[1]])
        return array;
    };

    const handleVote = async (e, charIdx, scheme) => {
        e.preventDefault();
        if (e.target.value == charIdx) {
            setColorScheme(scheme);
            await recordResult(charIdx);
            setVoted(true);
        }
    };

    const handleNext = (e) => {
        setVoted(false);
        setColorScheme(schemes['neutral'])
        shuffleAndPickChars(pool);
    };


    const recordResult = async (charIdx) => {
        let charsDup = chars;
        let winner = charsDup[charIdx];
        let loser = charsDup[Math.abs(charIdx - 1)];
        console.log({winner, loser})
        await axios.post('http://localhost:8000/api/battle/new',
            { winner: winner.name, loser: loser.name }
        )
            .then(res => {
                console.log(res);
                let records = res.data.result.opponents;
                let wins = getWins(records, winner.name);
                let losses = getWins(records, loser.name);
                let voters = wins + losses;
                let winPct = calcWinPct(wins, losses);
                console.log({winPct})
                charsDup[charIdx].winner = true;
                charsDup[charIdx].winPct = winPct;
                charsDup[charIdx].voters = wins;
                charsDup[charIdx].votersTotal = voters;
                charsDup[Math.abs(charIdx - 1)].winner = false;
                charsDup[Math.abs(charIdx - 1)].winPct = (100 - winPct).toPrecision(3);
                charsDup[Math.abs(charIdx - 1)].voters = losses;
                charsDup[Math.abs(charIdx - 1)].votersTotal = voters;
                setChars(charsDup);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const getWins = (data, name) => {
        const wins = data
            .filter((record) => record.name == name)
            .map((record) => record.wins)[0];
        return wins !== undefined ? wins : 0;
    };

    const calcWinPct = (wins, losses) => {
        if (!losses) return 100;
        return ((wins / (wins + losses)) * 100).toPrecision(3);
    };

    return (
        <animated.div className={`AppBody`} style={bg}>
            <BodyContext.Provider
                value={
                    {
                        pool,
                        chars,
                        voted,
                        schemes,
                        colorScheme,
                        setColorScheme,
                        handleVote,
                        handleNext,
                    }
                }
            >
                {
                    (pool.length > 0) ?
                        <>
                            <h2 style={{color: colorScheme['color']}}>{
                            colorScheme['color'] === schemes['neutral']['color']?
                            'Who is stronger with the Force?':
                            'You have spoken!'
                            }</h2>
                            <Battle />
                            <button 
                            onClick={handleNext}
                            className='NextButton' 
                            style={{color: colorScheme['color']}}>{
                                voted?
                                'Next':
                                'Skip'
                            }</button>
                            <div className='Links'>
                                <a href='https://github.com/lukejlackey'><img src={github} alt='Github Logo'/></a>
                                <a href='https://www.linkedin.com/in/lukejlackey'><img src={linkedin} alt='LinkedIn Logo'/></a>
                            </div>
                        </>
                        :
                        <h2 style={{color: colorScheme['color']}}>Reaching out to the Force...</h2>
                }
            </BodyContext.Provider>
        </animated.div>
    )
}

export default Body