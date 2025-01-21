import React from "react";
import bg from '../assets/bg.jpg'
import {TypeAnimation} from 'react-type-animation'
import {FaGithub, FaInstagram} from 'react-icons/fa'

const Main = () => {
    return (
        <div id='main'>
            <img className='w-full h-screen object-cover object-left' src={bg} alt="leaves" />
            <div className="w-full h-screen absolute top-0 left-0 bg-white/25">
            <div className="max-w-[700px] m-auto h-full w-full flex flex-col justify-center lg:items-start items-center">
                <h1 className="sm:text-5xl text-4xl font-bold text-gray-800">I'm Brett Sumser</h1>
                <h2 className="flex sm:3xl text-2xl pt-4 text-gray-800">
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
                <div className="flex justify-between pt-6 max-w-[200px] w-full">
                    <FaGithub className='cursor-pointer' size={30} onClick={() => window.open('https://www.github.com/bsumser', '_blank')}/>
                    <FaInstagram className="cursor-pointer" size={30}/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Main