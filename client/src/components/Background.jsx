import React from 'react'
import { useSpring, animated } from 'react-spring'
import bg from '../images/deep-space.jpg'

const Background = () => {
    const styles = useSpring({ 
        loop: true,
        to: { 
            rotateZ: 0,
        },
        from: { 
            rotateZ: 360,
        },
        config: {
            mass: 5,
            tension: 1,
            friction: 100
        }
    })
    return (
        <animated.div
        className='bg'
         style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            zIndex: -1,
            ...styles
        }}
        />)
}

export default Background