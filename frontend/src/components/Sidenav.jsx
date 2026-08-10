import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineHome, AiOutlineProject, AiOutlineMail } from 'react-icons/ai';
import { GrProjects } from 'react-icons/gr';
import { BsPerson } from "react-icons/bs";
import { MdOutlinePhotoAlbum } from "react-icons/md";
// --- IMPORTANT ---
// Make sure you have a resume file named 'resume.pdf' inside your 'src' folder
// or update the path here.
import resumePdf from '../resume.pdf';

const Sidenav = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div>
      {/* Hamburger Icon for Mobile */}
      <AiOutlineMenu onClick={handleNav} className='absolute top-4 right-4 z-[99] md:hidden' />
      {
        nav ? (
          // Mobile Menu (visible when 'nav' is true)
          <div className='fixed w-full h-screen bg-white/90 flex flex-col justify-center items-center z-20'>
            <a onClick={handleNav}
              href='#main'
              className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
            >
              <AiOutlineHome size={20} />
              <span className='pl-4'>Home</span>
            </a>
            <a onClick={handleNav}
              href='#work'
              className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
            >
              <GrProjects size={20} />
              <span className='pl-4'>Work</span>
            </a>
            <a onClick={handleNav}
              href='#projects'
              className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
            >
              <AiOutlineProject size={20} />
              <span className='pl-4'>Projects</span>
            </a>
            {/* Photo link is preserved */}
            <a onClick={handleNav}
              href='#photo'
              className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
            >
              <MdOutlinePhotoAlbum size={20} />
              <span className='pl-4'>Photo</span>
            </a>
            {/* Resume download link */}
            <a onClick={handleNav}
              href={resumePdf}
              download="Brett_Sumser_Resume.pdf"
              className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
            >
              <BsPerson size={20} />
              <span className='pl-4'>Resume</span>
            </a>
            {/* Email contact link */}
            <a onClick={handleNav}
              href='mailto:bsumser@gmail.com'
              className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
            >
              <AiOutlineMail size={20} />
              <span className='pl-4'>Contact</span>
            </a>
          </div>
        )
          : (
            // Empty when nav is false
            ''
          )}

      {/* Desktop Sidenav */}
      <div className='md:block hidden fixed top-[25%] z-10'>
        <div className='flex flex-col'>
          <a href='#main' className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
            <AiOutlineHome size={20} />
          </a>
          <a href='#work' className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
            <GrProjects size={20} />
          </a>
          <a href='#projects' className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
            <AiOutlineProject size={20} />
          </a>
          {/* Photo link is preserved */}
          <a href='#photo' className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
            <MdOutlinePhotoAlbum size={20} />
          </a>
          {/* Resume download link */}
          <a href={resumePdf} download="Brett_Sumser_Resume.pdf" className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
            <BsPerson size={20} />
          </a>
          {/* Email contact link */}
          <a href='mailto:bsumser@gmail.com' className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
            <AiOutlineMail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
