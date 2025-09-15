import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Placeholder logo path

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = ['Home', 'About', 'Services', 'Sponsors', 'Contact'];

  return (
<nav
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    scrolled
      ? 'bg-gray-900 bg-opacity-90 shadow-lg'
      : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-opacity-80'
  } backdrop-blur-md`}
>



      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Logo + Brand */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="PhysioCare India Logo"
            className="h-16 md:h-20 mr-2"
          />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item}
              to="/coming-soon"
              className={`text-lg font-medium ${
                scrolled ? 'text-white' : 'text-white'
              } hover:text-pink-300 transition-colors`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-gray-900 bg-opacity-95 backdrop-blur-md`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item}
              to="/coming-soon"
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-medium hover:text-pink-300 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

{/* Animated Background Blobs */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* Top-left blob (white) */}
  <div className="absolute w-80 h-80 bg-white bg-opacity-20 rounded-full -top-40 -left-40 animate-blob"></div>

  {/* Bottom-right blob (light gray) */}
  <div className="absolute w-80 h-80 bg-gray-400 bg-opacity-20 rounded-full bottom-0 right-0 animate-blob animation-delay-2000"></div>

  {/* Middle blob (blue-gray) */}
  <div className="absolute w-64 h-64 bg-blue-500 bg-opacity-20 rounded-full top-1/2 left-1/4 animate-blob animation-delay-4000"></div>
</div>


      <style jsx>{`
        .backdrop-blur-md {
          backdrop-filter: blur(10px);
        }
        .animate-blob {
          animation: blob 12s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(50px, 50px); }
          50% { transform: translate(0, 100px); }
          75% { transform: translate(-50px, 50px); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;