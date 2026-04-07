import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_NAME } from '../constants/brand';
import { categories } from '../data/reviews';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'h-20 backdrop-blur-2xl bg-white/90 shadow-2xl shadow-blue-900/5' : 'h-24 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-3 group relative z-[110]">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#003D9B] to-[#0052CC] rounded-[18px] flex items-center justify-center text-white font-bold text-2xl shadow-xl group-hover:scale-105 transition-all rotate-3 group-hover:rotate-0">
            H
          </div>
          <span className="font-display font-black text-2xl tracking-tighter text-[#191C1D]">
            Health Line<span className="text-[#0052CC]"> Review</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12 relative z-[110]">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `font-bold text-xs uppercase tracking-widest transition-all hover:text-[#0052CC] ${
                  isActive ? 'text-[#0052CC]' : 'text-gray-900/60'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Categories Dropdown Container */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setCatMenuOpen(true)}
            onMouseLeave={() => setCatMenuOpen(false)}
          >
            <button className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${catMenuOpen ? 'text-[#0052CC]' : 'text-gray-900/60 hover:text-[#0052CC]'}`}>
              Categories
              <i className={`ri-arrow-down-s-line text-lg transition-transform duration-500 ${catMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>
            
            <AnimatePresence>
              {catMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[32px] p-8 mt-2 grid grid-cols-2 gap-x-10 gap-y-2 z-[200]"
                >
                  <div className="col-span-2 border-b border-gray-50 pb-4 mb-4">
                     <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Scientific Categories</span>
                  </div>
                  {categories.map((cat) => (
                    <Link 
                      key={cat} 
                      to={`/reviews?category=${cat}`}
                      className="group flex items-center justify-between py-3 px-4 rounded-xl hover:bg-[#0052CC]/5 transition-all"
                      onClick={() => setCatMenuOpen(false)}
                    >
                      <span className="text-sm font-bold text-gray-600 group-hover:text-[#0052CC]">{cat}</span>
                      <i className="ri-arrow-right-line text-gray-200 group-hover:text-[#0052CC] transition-colors"></i>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            to="/reviews" 
            className="px-8 py-3.5 bg-gradient-to-r from-[#003D9B] to-[#0052CC] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-blue-600/30 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            All Reviews
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden w-12 h-12 bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-1.5 hover:bg-gray-100 transition-colors relative z-[110]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <motion.span 
            animate={mobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#191C1D] rounded-full"
          />
          <motion.span 
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-4 h-0.5 bg-[#191C1D] rounded-full"
          />
          <motion.span 
            animate={mobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#191C1D] rounded-full"
          />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed inset-0 bg-white z-[105] pt-32 px-6 flex flex-col gap-8 overflow-y-auto pb-12"
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-4xl font-display font-black text-[#191C1D] hover:text-[#0052CC] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[1px] bg-gray-100 my-4"></div>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Categories</p>
              <div className="grid grid-cols-1 gap-4">
                 {categories.map(cat => (
                   <Link 
                    key={cat} 
                    to={`/reviews?category=${cat}`} 
                    className="text-xl font-bold text-gray-400 hover:text-[#0052CC]"
                    onClick={() => setMobileMenuOpen(false)}
                   >
                     {cat}
                   </Link>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
