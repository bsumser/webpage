import React from 'react';

// The WorkItem component is defined here to ensure the component is self-contained.
// This component displays an individual entry for work or education history.
const WorkItem = ({ year, title, duration, details }) => {
  return (
    <ol className='flex flex-col md:flex-row relative border-l border-stone-200'>
      <li className='mb-10 ml-4'>
        <div className='absolute w-3 h-3 bg-stone-200 rounded-full mt-1.5 -left-1.5 border-white' />
        <p className='flex flex-wrap gap-4 flex-row items-center justify-start text-xs md:text-sm'>
          <span className='inline-block px-2 py-1 font-semibold text-white bg-[#001b5e] rounded-md'>{year}</span>
          <span className='text-lg font-semibold text-[#001b5e]'>{title}</span>
          <span className='my-1 text-sm font-normal leading-none text-stone-400'>{duration}</span>
        </p>
        <p className='my-2 text-base font-normal text-stone-500'>{details}</p>
      </li>
    </ol>
  )
}

// Data array containing detailed descriptions of work and education.
const data = [
  {
    year: 2024,
    title: 'Code Sensei - Code Ninjas',
    duration: 'September 2024 - Present',
    details: 'As a Code Sensei, I go beyond just teaching; I mentor young learners on their journey into technology. My role involves breaking down complex programming concepts in JavaScript and Microsoft MakeCode into engaging, understandable lessons for children aged 7-12. One of my proudest moments was designing and building a custom adaptive input device from scratch using C++, a 3D printer, and basic electronics to ensure a student with limited dexterity could fully participate and succeed.',
  },
  {
    year: 2020,
    title: 'B.S. Computer Science - University of Oregon',
    duration: 'September 2020 - June 2024',
    details: 'My degree provided a deep dive into the fundamentals of computing, from theory to application. Courses like Operating Systems and Data Structures built my core knowledge, while advanced classes like Automata Theory and Principles of Programming Languages challenged me to think abstractly. I directly applied this knowledge in my "Intro to Compilers" course, where I led the development of the parsing and type-checking modules for a new object-oriented language.',
  },
  {
    year: 2020,
    title: 'Server - Ambrosia Restaurant',
    duration: 'May 2020 - Present',
    details: 'Working in a high-pressure, fine-dining environment was an exercise in clear communication, grace under pressure, and effective time management. This role required constant collaboration with kitchen and management teams to deliver an exceptional client experience, much like a development team works together to release a product. I learned to manage client expectations and resolve conflicts, skills that are directly transferable to working with users and stakeholders in a technical setting.',
  },
];

const Work = () => {
  return (
    <div id='work' className='max-w-[1040px] m-auto md:pl-20 p-4 py-16'>
      <h1 className='text-4xl font-bold text-center text-[#001b5e]'>Work & Education</h1>
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

export default Work;
