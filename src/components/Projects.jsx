import React from 'react'
import ProjectItem from './ProjectItem'
import propertyImage from '../assets/property.png'

const Projects = () => {
  return (
    <div id='projects' className='max-w-[1040px] m-auto md:pl-20 p-4 py-16'>
        <h1 className='text-4xl font-bold text-center text-[#001b5e]'>Projects</h1>
        <p className='text-center py-8'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac posuere quam, quis aliquam tortor.
        </p>
        <div className='grid sm:grid-cols-2 gap-12'>
            <ProjectItem img={propertyImage} title='GitHub' />
            <ProjectItem img={propertyImage} title='GitHub' />
            <ProjectItem img={propertyImage} title='GitHub' />
            <ProjectItem img={propertyImage} title='GitHub' />
        </div>
    </div>
  )
}

export default Projects