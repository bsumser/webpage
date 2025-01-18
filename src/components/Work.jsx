import React from 'react'
import WorkItem from './WorkItem'

const data = [
    {
        year: 2024,
        title: 'Code Sensei',
        duration: 'Current',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac posuere quam, quis aliquam tortor.',
    },
    {
        year: 2024,
        title: 'Code Sensei',
        duration: 'Current',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac posuere quam, quis aliquam tortor.',
    },
    {
        year: 2024,
        title: 'Code Sensei',
        duration: 'Current',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac posuere quam, quis aliquam tortor.',
    },
    {
        year: 2024,
        title: 'Code Sensei',
        duration: 'Current',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac posuere quam, quis aliquam tortor.',
    },
];

const Work = () => {
  return (
    <div id='work' className='max-w-[1040px] m-auto md:pl-20 p-4 py-16'>
        <h1 className='text-4xl font-bold text-center text-[#001b5e]'>Work</h1>
        {data.map((item, idx) => (
            <WorkItem 
                key={idx} 
                year={item.year} 
                title={item.title} 
                duration={item.duration} 
                details={item.details}
            />
        ))}
    </div>
  );
};

export default Work
