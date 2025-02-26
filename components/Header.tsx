// pokemon-explorer/components/Header.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SearchForm from './SearchForm';

function Header() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Add event listener to detect scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true); // Start animation after scrolling 50px
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 w-full z-50 py-6 px-16 flex justify-between items-center">
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-white shadow-md"
        initial={{ opacity: 1, filter: 'blur(0px)' }}
        animate={{
          opacity: scrolling ? 0.9 : 1, // Adjust opacity based on scroll
          filter: scrolling ? 'blur(0.9px)' : 'blur(0px)',
          transition: { duration: 0.3 },
        }}
        style={{
          zIndex: -1, // Ensures the background stays behind the content (logo, search bar)
        }}
      ></motion.div>

      {/* Logo and Search Form */}
      <div className="relative flex justify-between items-center w-full">
        <Link href="/">
          <Image src="/pokemon--logo.png" width={120} height={90} alt="logo" />
        </Link>
        <SearchForm />
      </div>
    </header>
  );
}

export default Header;
