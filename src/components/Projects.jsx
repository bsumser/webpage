import React from 'react'
import ProjectItem from './ProjectItem'
import quackImage from '../assets/duck.png'
import aocImage from '../assets/aoc.png'
import proj3img from '../assets/property.png'
import proj4img from '../assets/web.png'

const Projects = () => {
  return (
    <div id='projects' className='max-w-[1040px] m-auto md:pl-20 p-4 py-16'>
        <h1 className='text-4xl font-bold text-center text-[#001b5e]'>Projects</h1>
        <p className='text-center py-8'>
          Here is a selection of some of the projects I have worked on. There is a mix of school projects, and personal projects. 
          You can also check out my repository for this website!
        </p>
        <div className='grid sm:grid-cols-2 gap-12'>
            <ProjectItem img={quackImage} title='Quack' desc='Objected Oriented Programming Langauge' link='https://github.com/bsumser/tiny_vm'/>
            <ProjectItem img={aocImage} title='Advent of Code' desc='Christmas themed programming competition!' link='https://github.com/bsumser/AOC'/>
            <ProjectItem img={proj3img} title='Neural Network' desc='' link='https://github.com/bsumser/neuralNetwork'/>
            <ProjectItem img={proj4img} title='Website' desc='' link='https://github.com/bsumser/webpage'/>
        </div>
    </div>
  )
}

export default Projects
