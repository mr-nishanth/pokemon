'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SearchForm from './SearchForm';

function Header() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Detect scroll to add/remove styles dynamically
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true); // Change header style after scrolling
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 w-full z-50 py-4 sm:py-6 px-6 sm:px-16 flex flex-col sm:flex-row justify-between items-center bg-white shadow-md transition-all duration-300 ease-in-out">
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-white shadow-md"
        initial={{ opacity: 1, filter: 'blur(0px)' }}
        animate={{
          opacity: scrolling ? 0.9 : 1,
          filter: scrolling ? 'blur(0.9px)' : 'blur(0px)',
          transition: { duration: 0.3 },
        }}
        style={{ zIndex: -1 }}
      ></motion.div>

      {/* Main container for header items */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full">
        {/* Logo Section */}
        <Link
          href="/"
          className="w-full sm:w-auto flex justify-center sm:justify-start mb-4 sm:mb-0"
        >
          <Image src="/pokemon--logo.png" width={120} height={90} alt="Logo" />
        </Link>

        <SearchForm />
      </div>
    </header>
  );
}

export default Header;
