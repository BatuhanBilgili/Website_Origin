import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Footer = ({ isDarkMode }) => {
  return (
    <div
      className="mt-10"
      style={{
        backgroundImage: isDarkMode ? 'none' : `url(${assets.footer_bg_color})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'calc(100% - 40px)'
      }}
    >
      <div className='text-center'>
        <Image
          src={isDarkMode ? assets.logo_dark : assets.logo}
          alt="Logo"
          className='w-36 mx-auto mb-2'
        />
        <div className='w-max flex items-center gap-2 mx-auto'>
          <Image
            src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon}
            alt="Mail Icon"
            className='w-6'
          />
          batubilgili1907.bb@gmail.com
        </div>
      </div>

      <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-8 py-6'>
        <p>©️ 2025 Batuhan Bilgili. All rights reserved.</p>
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
          <li><a target='_blank' href='https://github.com/BatuhanBilgili'>Github</a></li>
          <li><a target='_blank' href='https://www.linkedin.com/in/batuhan-bilgili/'>LinkedIn</a></li>
          <li><a target='_blank' href='https://medium.com/@batubilgili1907.bb'>Medium</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer