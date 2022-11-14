import React from 'react'
import { useSpring, animated, config } from 'react-spring'

const Title = () => {

    const stylesH1 = useSpring({ 
        to: { 
            textShadow:'0 0 2vw #ff0000, 0 0 0.3vw #ff0000, 0 0 0.5vw #ffffff',
            color: 'hsla(0, 0%, 100%, 0.396)'
        },
        from: { 
            color: 'hsl(0, 78%, 33%)'
        },
        config: {
            duration: '1000'
        }
    })

    const stylesH3 = useSpring({ 
        to: { 
            textShadow:'0 0 0.5vw #ffe814, 0 0 0.15vw #ffe814, 0 0 0.35vw #ffffff',
            color: 'hsla(0, 0%, 100%, 0.396)'
        },
        from: { 
            color: 'hsla(0, 0%, 100%, 1)'
        },
        config: {
            duration: '1000'
        }
    })

    return (
        <div className='Title'>
            <animated.h3 style={stylesH3}>Star Wars</animated.h3>
            <animated.h1 style={stylesH1}>Force Battles</animated.h1>
        </div>
    )
}

export default Title