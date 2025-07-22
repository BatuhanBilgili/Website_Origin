import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Certificate = ({ isDarkMode }) => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetch('/api/certificate')
      .then(res => res.json())
      .then(data => setCertificates(data));
  }, []);

  return (
    <div id='certificate' className='w-full max-w-5xl mx-auto py-16 px-4 scroll-mt-30'>
      <h4 className='text-center mb-2 text-lg font-Ovo'>Achievements</h4>
      <h2 className='text-center text-5xl font-Ovo'>My Certificates</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10 gap-5'>
        {certificates.map((cert, index) => (
          <div
            key={cert.id}
            className='relative aspect-square rounded-lg overflow-hidden cursor-pointer group bg-gray-100'
          >
            <img
              src={cert.imageUrl}
              alt={cert.title}
              className='absolute inset-0 w-full h-full object-cover'
              style={{ zIndex: 1 }}
            />
            <div className='absolute inset-0 bg-black/5 group-hover:bg-black/10 transition' style={{ zIndex: 2 }}></div>
            {cert.link ? (
              <a
                href={cert.link}
                target='_blank'
                rel='noopener noreferrer'
                className='relative z-10 bg-white/90 w-10/12 rounded-md absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2 py-3 px-5 flex items-center justify-between duration-300 group-hover:-translate-y-10'
              >
                <div>
                  <h2 className={isDarkMode ? 'font-semibold text-black' : 'font-semibold'}>{cert.title}</h2>
                  <p className='text-sm text-gray-700'>{cert.category}</p>
                </div>
                <div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-purple-300 transition'>
                  <Image src={assets.send_icon} alt='send icon' width={24} height={24} className='w-6 h-6' />
                </div>
              </a>
            ) : (
              <div className='relative z-10 bg-white/90 w-10/12 rounded-md absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2 py-3 px-5 flex items-center justify-between duration-300 group-hover:-translate-y-10'>
                <div>
                  <h2 className={isDarkMode ? 'font-semibold text-black' : 'font-semibold'}>{cert.title}</h2>
                  <p className='text-sm text-gray-700'>{cert.category}</p>
                </div>
                <div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-purple-300 transition'>
                  <Image src={assets.send_icon} alt='send icon' width={24} height={24} className='w-6 h-6' />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificate;