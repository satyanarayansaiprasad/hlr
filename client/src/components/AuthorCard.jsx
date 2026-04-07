import React from 'react';
import { motion } from 'framer-motion';

const AuthorCard = ({ author }) => {
  const { 
    name, 
    role, 
    bio, 
    avatar, 
    socials, 
    education, 
    specialization 
  } = author;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="card border border-gray-100 flex flex-col items-center bg-white p-8 md:p-10 relative overflow-hidden group shadow-lg shadow-[#0052CC]/5"
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#0052CC]/5 to-transparent -z-10 group-hover:h-full transition-all"></div>

      <div className="relative mb-8 text-center">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto ring-1 ring-[#0052CC]/10 ring-offset-4 ring-offset-white">
          <img src={avatar} alt={name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-[#91F78E] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg text-[#006E1C] border-2 border-white ring-1 ring-[#91F78E]">
          Verified Expert
        </div>
      </div>

      <div className="text-center w-full">
        <h3 className="font-display font-bold text-2xl text-[#191C1D] mb-1 leading-tight">{name}</h3>
        <p className="text-sm font-bold text-[#0052CC] uppercase tracking-wider mb-6">{role}</p>
        
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {specialization.map((spec, idx) => (
            <span key={idx} className="bg-[#EDEEEF] px-4 py-1.5 rounded-full text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              {spec}
            </span>
          ))}
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          {bio}
        </p>

        <div className="pt-8 border-t border-gray-100 w-full flex justify-between items-center bg-white/50 backdrop-blur-xl">
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-[#0052CC] hover:text-white flex items-center justify-center transition-all">
              <i className="ri-twitter-line"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-[#0052CC] hover:text-white flex items-center justify-center transition-all">
              <i className="ri-linkedin-fill"></i>
            </a>
          </div>
          <button className="text-xs font-bold text-[#0052CC] uppercase tracking-widest hover:underline scroll-smooth flex items-center gap-2">
            Full Profile <i className="ri-arrow-right-up-line"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorCard;
