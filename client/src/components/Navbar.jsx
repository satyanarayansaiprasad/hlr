import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_NAME } from '../constants/brand';
import { categoriesList } from '../data/reviews';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Reviews', path: '/reviews', hasDropdown: true },
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
            Health Line<span className="text-[#0052CC]"> Review</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `flex items-center gap-1 font-medium text-sm transition-colors hover:text-[#0052CC] ${
                      isActive ? 'text-[#0052CC]' : 'text-gray-600'
                    }`
                  }
                >
                  {link.name}
                  <i className={`ri-arrow-down-s-line transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}></i>
                </NavLink>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-4 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 z-50 grid gap-1"
                    >
                      {categoriesList.map(cat => (
                        <Link 
                          key={cat.id} 
                          to={`/reviews/${cat.id}`}
                          className="px-5 py-2 text-sm text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 transition-colors flex items-center gap-3"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <i className={`${cat.icon} text-gray-400`}></i>
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
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
            )
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
              link.hasDropdown ? (
                <div key={link.name} className="flex flex-col border-b border-gray-50 last:border-0">
                  <div 
                    className="flex justify-between items-center p-2"
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  >
                    <NavLink
                      to={link.path}
                      className="text-lg font-medium text-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                    <button className="p-2 text-gray-500">
                      <i className={`ri-arrow-down-s-line transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                  </div>
                  <AnimatePresence>
                    {mobileDropdownOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50 rounded-xl mx-2 mb-2"
                      >
                        {categoriesList.map(cat => (
                          <Link 
                            key={cat.id} 
                            to={`/reviews/${cat.id}`}
                            className="block px-6 py-3 text-sm text-gray-600 hover:text-[#0052CC]"
                            onClick={() => { setMobileMenuOpen(false); setMobileDropdownOpen(false); }}
                          >
                            <i className={`${cat.icon} mr-2 text-gray-400`}></i>
                            {cat.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="text-lg font-medium p-2 text-gray-800 border-b border-gray-50 last:border-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              )
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
