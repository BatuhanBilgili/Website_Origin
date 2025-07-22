import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { assets, infoList, toolsData } from '../../assets/assets'

const About = ({ isDarkMode }) => {
  const [aboutText, setAboutText] = useState('');

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => setAboutText(data.content || ''));
  }, []);

  return (
    <div id='about' className='w-full px-4 sm:px-[8%] lg:px-[12%] py-10 scroll-mt-30'>
      <h4 className='text-center mb-2 text-lg font-Ovo'>Introduction</h4>
      <h2 className='text-center text-3xl sm:text-4xl lg:text-5xl font-Ovo'>About Me</h2>
      <div className='flex w-full flex-col lg:flex-row items-center gap-10 lg:gap-20 my-10 lg:my-20'>
        <div className='flex-1 w-full'>
          <p className='mb-10 max-w-2xl font-Ovo text-center mx-auto px-4 sm:px-0 leading-relaxed'>
            {aboutText}
          </p>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4'>
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              <li
                className={`border-[0.5px] border-gray-400 rounded-xl p-4 sm:p-6 cursor-pointer hover:-translate-y-1 duration-500 ${
                  isDarkMode
                    ? 'hover:bg-[#3D3D5C]/50 hover:shadow-[4px_4px_0px_white]'
                    : 'hover:bg-[#fcf4ff] hover:shadow-[4px_4px_0px_black]'
                }`}
                key={index}
              >
                <Image
                  src={isDarkMode ? iconDark : icon}
                  alt={title}
                  className='w-6 sm:w-7 mb-3'
                />
                <h3 className={`text-base sm:text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-700'
                }`}>
                  {title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {description}
                </p>
              </li>
            ))}
          </ul>
          <h3 className={`text-center text-xl sm:text-2xl my-8 font-Ovo ${
            isDarkMode ? 'text-white/80' : 'text-gray-700'
          }`}>
            Tools I Use
          </h3>
          <ul className='flex items-center justify-center gap-3 sm:gap-5 flex-wrap px-4'>
            {toolsData.map((tool, index) => (
              <li
                className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500'
                key={index}
              >
                <Image src={tool} alt='Tool' className='w-5 sm:w-7' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
