'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { useRouter } from 'next/navigation';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false)
  const sideMenuRef = useRef()
  const router = useRouter();

  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)'
  }

  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)'
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsScroll(window.scrollY > 50)
    })
  }, [])

  useEffect(() => {
    document.documentElement.style.backgroundColor = isDarkMode ? '#18181b' : 'white'
    document.body.style.color = isDarkMode ? 'white' : 'black'
  }, [isDarkMode])

  // Çıkış yap fonksiyonu
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    router.replace('/admin/login');
  };

  return (
    <nav
      className={`w-full fixed px-3 sm:px-5 lg:px-8 xl:px-[8%] py-3 flex items-center justify-between z-50 transition-all duration-300  backdrop-blur-md`}
      style={{
        backgroundImage: isDarkMode
          ? 'none'
          : isScroll
            ? 'none'
            : `url(${assets.header_bg_color})`,
        backgroundColor: isDarkMode
          ? 'rgba(24, 24, 27, 0.7)'
          : isScroll
            ? 'rgba(255, 255, 255, 0.7)'
            : 'transparent',
        color: isDarkMode ? 'white' : 'black',
        boxShadow: isScroll ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center left'
      }}
    >
      <a href='#top'>
        <Image
          src={isDarkMode ? assets.logo_dark : assets.logo}
          alt='Logo'
          className='w-20 sm:w-24 cursor-pointer mr-4 sm:mr-8 lg:mr-14'
        />
      </a>

      {/* Desktop Menu - Responsive text sizes */}
      <ul className={`hidden lg:flex items-center justify-center gap-4 xl:gap-6 2xl:gap-8 rounded-full px-6 xl:px-10 2xl:px-12 py-2.5 xl:py-3 ${
        isDarkMode ? 'border border-gray-500' : 'border border-gray-500 bg-white shadow-sm'
      }`}>
        <li><a className='font-Ovo text-sm xl:text-base transition-colors' href='#top'>Home</a></li>
        <li><a className='font-Ovo text-sm xl:text-base transition-colors' href='#about'>About Me</a></li>
        <li><a className='font-Ovo text-sm xl:text-base transition-colors' href='#experience'>Experience</a></li>
        <li><a className='font-Ovo text-sm xl:text-base transition-colors' href='#certificate'>Certificate</a></li>
        <li><a className='font-Ovo text-sm xl:text-base transition-colors' href='#medium'>Medium</a></li>
        <li><a className='font-Ovo text-sm xl:text-base transition-colors' href='#contact'>Contact Me</a></li>
      </ul>

      {/* Tablet Menu - Medium screens */}
      <ul className={`hidden md:flex lg:hidden justify-center items-center gap-3 rounded-full px-4 py-2 ${
        isDarkMode ? 'border border-gray-500' : 'border border-gray-500 bg-white shadow-sm'
      }`}>
        <li><a className='font-Ovo text-sm transition-colors' href='#top'>Home</a></li>
        <li><a className='font-Ovo text-sm transition-colors' href='#about'>About Me</a></li>
        <li><a className='font-Ovo text-sm transition-colors' href='#experience'>Experience</a></li>
        <li><a className='font-Ovo text-sm transition-colors' href='#certificate'>Certificate</a></li>
        <li><a className='font-Ovo text-sm transition-colors' href='#medium'>Medium</a></li>
        <li><a className='font-Ovo text-sm transition-colors' href='#contact'>Contact Me</a></li>
      </ul>

      <div className='flex items-center gap-2 sm:gap-4'>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full border transition-colors hover:scale-110 transform duration-200"
          style={{
            backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
            borderColor: '#6b7280',
          }}
        >
          {isDarkMode ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        {/* Logout Button (sadece admin_token varsa göster) */}
        {typeof window !== 'undefined' && document.cookie.split(';').some(c => c.trim().startsWith('admin_token=')) && (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Çıkış Yap
          </button>
        )}
        {/* Contact Button - Hidden on mobile and tablet */}
        <a 
          href='#contact' 
          className='hidden xl:flex items-center gap-3 px-6 xl:px-8 2xl:px-10 py-2 xl:py-2.5 border border-gray-500 rounded-full font-Ovo text-sm xl:text-base transition-all duration-300'
        >
          Contact
          <Image src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon} alt='Arrow' className='w-3' />
        </a>

        {/* Mobile Menu Button */}
        <button className='block md:hidden' onClick={openMenu}>
          <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='Menu' className='w-5 sm:w-6' />
        </button>
      </div>

      {/* Mobile Menu */}
      <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-6 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen transition duration-500'
        style={{ 
          backgroundColor: isDarkMode ? 'rgb(24, 24, 27)' : 'white', 
          color: isDarkMode ? 'white' : 'black',
          boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className='absolute right-6 top-6' onClick={closeMenu}>
          <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='Close' className='w-5 cursor-pointer hover:scale-110 transform transition-transform' />
        </div>
        <li><a className='font-Ovo text-lg transition-colors' onClick={closeMenu} href='#top'>Home</a></li>
        <li><a className='font-Ovo text-lg transition-colors' onClick={closeMenu} href='#about'>About Me</a></li>
        <li><a className='font-Ovo text-lg transition-colors' onClick={closeMenu} href='#experience'>Experience</a></li>
        <li><a className='font-Ovo text-lg transition-colors' onClick={closeMenu} href='#certificate'>Certificate</a></li>
        <li><a className='font-Ovo text-lg transition-colors' onClick={closeMenu} href='#medium'>Medium</a></li>
        <li><a className='font-Ovo text-lg transition-colors' onClick={closeMenu} href='#contact'>Contact Me</a></li>
      </ul>
    </nav>
  )
}

export default Navbar