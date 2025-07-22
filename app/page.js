'use client';
import Header from './components/Header';
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';
import Certificate from './components/Certificate';
import Medium from './components/Medium';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import './globals.css';




export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // localStorage'dan tema durumunu kontrol et
    if (localStorage.theme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      // Dark mode açıldığında
      document.documentElement.style.backgroundColor = '#18181b';
      document.documentElement.style.color = 'white';
      document.body.style.backgroundColor = '#18181b';
      document.body.style.color = 'white';
      localStorage.theme = 'dark';
    } else {
      // Light mode açıldığında
      document.documentElement.style.backgroundColor = '';
      document.documentElement.style.color = '';
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  // Dark mode toggle fonksiyonu
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!mounted) return null;

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Header isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Experience isDarkMode={isDarkMode} />
      <Certificate isDarkMode={isDarkMode} />
      <Medium isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}