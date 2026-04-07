import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, BRAND_TAGLINE } from '../constants/brand';

const Footer = () => {
  return (
    <footer className="bg-[#191C1D] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-[#0052CC] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ring-1 ring-white/10 group-hover:scale-105 transition-transform">
                H
              </div>
               <span className="font-display font-bold text-2xl tracking-tight text-white">
                Health Line<span className="text-[#0052CC]"> Review</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {BRAND_TAGLINE} Expert-vetted reviews, clinical insights, and transparent comparisons for your wellness journey.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0052CC] transition-colors">
                <i className="ri-twitter-line text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0052CC] transition-colors">
                <i className="ri-instagram-line text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0052CC] transition-colors">
                <i className="ri-linkedin-box-line text-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-[#91F78E]">Navigation</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'Reviews', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-[#0052CC]">Categories</h4>
            <ul className="flex flex-col gap-4">
              {['Supplements', 'Gut Health', 'Fitness Gear', 'Mental Wellness'].map((cat) => (
                <li key={cat}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white text-opacity-90">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Join 50k+ readers receiving our monthly health digests.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-800 border-none rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-[#0052CC] w-full outline-none transition-all"
              />
              <button 
                type="submit" 
                className="bg-[#0052CC] text-white p-2 rounded-lg hover:bg-opacity-90 transition-opacity"
              >
                <i className="ri-send-plane-fill"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © 2026 {BRAND_NAME} Editorial Authority. All rights reserved. <br className="md:hidden" />
            <span className="hidden md:inline"> | </span> 
            Medical Disclaimer: Content is for informational purposes only.
          </p>
          <div className="flex gap-8 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Affiliate Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
