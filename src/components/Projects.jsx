import React from 'react'
import ProjectItem from './ProjectItem'
import propertyImage from '../assets/property.png'
import aocImage from '../assets/aoc.png'

const Projects = () => {
  return (
    <div id='projects' className='max-w-[1040px] m-auto md:pl-20 p-4 py-16'>
        <h1 className='text-4xl font-bold text-center text-[#001b5e]'>Projects</h1>
        <p className='text-center py-8'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac posuere quam, quis aliquam tortor.
        </p>
        <div className='grid sm:grid-cols-2 gap-12'>
            <ProjectItem img={propertyImage} title='Quack' desc='' link='https://github.com/bsumser/tiny_vm'/>
            <ProjectItem img={aocImage} title='Advent of Code' desc='' link='https://github.com/bsumser/AOC'/>
            <ProjectItem img={propertyImage} title='Neural Network' desc='' link='https://github.com/bsumser/neuralNetwork'/>
            <ProjectItem img={propertyImage} title='GitHub' desc='' link='https://github.com/bsumser/tiny_vm'/>
        </div>
    </div>
  )
}

export default Projects