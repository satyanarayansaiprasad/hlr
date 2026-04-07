import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'h-16 backdrop-blur-xl bg-white/80 shadow-sm border-b border-gray-100' : 'h-20 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#003D9B] to-[#0052CC] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
            H
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[#191C1D]">
            Health<span className="text-[#0052CC]">Quest</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `font-medium text-sm transition-colors hover:text-[#0052CC] ${
                  isActive ? 'text-[#0052CC]' : 'text-gray-600'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link 
            to="/reviews" 
            className="btn-primary flex items-center text-sm font-semibold"
          >
            Start Exploring
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <motion.span 
            animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
            className="w-6 h-0.5 bg-gray-800"
          ></motion.span>
          <motion.span 
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
            className="w-6 h-0.5 bg-gray-800"
          ></motion.span>
          <motion.span 
            animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -4 : 0 }}
            className="w-6 h-0.5 bg-gray-800"
          ></motion.span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="text-lg font-medium p-2 text-gray-800 border-b border-gray-50 last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <Link 
              to="/reviews" 
              className="btn-primary w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Exploring
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
