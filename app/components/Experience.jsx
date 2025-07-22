import React, { useEffect, useState } from 'react';

const Experience = ({ isDarkMode }) => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch('/api/experience')
      .then(res => res.json())
      .then(data => setExperiences(data));
  }, []);

  return (
    <div id='experience' className='w-full max-w-4xl mx-auto py-16 scroll-mt-30'>
      <h2 className='text-4xl font-Ovo text-center mb-4'>Experience</h2>
      <h4 className={'text-lg text-center mb-12 font-Ovo'}>
        My professional journey
      </h4>
      <div className='relative'>
        <div className='absolute left-1/2 top-0 bottom-0 w-2 bg-gray-400 -translate-x-1/2 z-0 rounded-full opacity-40'></div>
        <ul className='space-y-12 relative z-10'>
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className={`w-full sm:w-1/2 p-6 rounded-xl shadow-md relative ${
                isDarkMode ? 'bg-[#18181b] border border-white' : 'bg-white'
              } ${idx % 2 === 0 ? 'ml-0 mr-auto' : 'mr-0 ml-auto'}`}
              style={{
                transition: 'background 0.5s, box-shadow 0.5s, border 0.5s',
              }}
              onMouseEnter={e => {
                if (!isDarkMode) {
                  e.currentTarget.style.background = '#fcf4ff';
                }
                e.currentTarget.style.boxShadow = isDarkMode
                  ? '4px 4px 0px white'
                  : '4px 4px 0px black';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <h3 className='text-xl font-semibold mb-1'>{exp.title}</h3>
              <span className={isDarkMode ? 'text-sm text-white/80' : 'text-sm text-gray-500'}>
                {exp.company} • {exp.date} {exp.isCurrent && <span className='text-xs text-green-600'>(Devam Ediyor)</span>}
              </span>
              <p className={isDarkMode ? 'mt-2 white' : 'mt-2 text-gray-700'}>{exp.description}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Experience;