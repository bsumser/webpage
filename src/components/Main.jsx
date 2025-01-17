import React from "react";
import bg from '../assets/bg.jpg'
import {TypeAnimation} from 'react-type-animation'
import {FaGithub, FaInstagram} from 'react-icons/fa'

const Main = () => {
    return (
        <div id='main'>
            <img className='w-full h-screen object-cover object-left' src={bg} alt="leaves" />
            <div className="w-full h-screen absolute top-0 left-0 bg-white/25">
            <div>
                <h1>I'm Brett Sumser</h1>
                <h2>
                    I'm a 
                    <TypeAnimation
                      sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Developer',
                        2000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Coder',
                        2000,
                        'Photographer',
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      style={{ fontSize: '1em', display: 'inline-block', paddingLeft: '5px'}}
                      repeat={Infinity}
                    />
                </h2>
                <div>
                    <FaGithub className='cursor-pointer' size={20}/>
                    <FaInstagram className="cursor-pointer" size={20}/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Main