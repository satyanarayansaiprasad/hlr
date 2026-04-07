import React from 'react';
import { motion } from 'framer-motion';

const CTASection = ({ title, description, buttonText, onButtonClick, variant = 'primary' }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`py-24 ${variant === 'secondary' ? 'bg-[#191C1D] text-white' : 'bg-[#F8F9FA] text-[#191C1D]'}`}
    >
      <div className="container mx-auto px-4 text-center max-w-4xl relative overflow-hidden">
        {/* Background Accents (Circle Glow) */}
        {variant === 'primary' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#0052CC]/5 to-transparent rounded-full -z-10 blur-3xl"></div>
        )}

        <span className={`text-[12px] font-bold uppercase tracking-[0.2em] mb-6 block ${variant === 'secondary' ? 'text-[#91F78E]' : 'text-[#0052CC]'}`}>
          Take Control of Your Health
        </span>
        
        <h2 className={`font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight ${variant === 'secondary' ? 'text-white' : 'text-[#191C1D]'}`}>
          {title}
        </h2>
        
        <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${variant === 'secondary' ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={onButtonClick}
            className={`px-10 py-5 rounded-xl font-bold text-lg shadow-xl shadow-[#0052CC]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 ${
              variant === 'secondary' ? 'bg-[#0052CC] text-white' : 'btn-primary'
            }`}
          >
            {buttonText}
            <i className="ri-arrow-right-line text-2xl"></i>
          </button>
          
          <button className={`font-bold transition-colors ${variant === 'secondary' ? 'text-white hover:text-[#91F78E]' : 'text-[#191C1D] hover:text-[#0052CC]'}`}>
            How our review process works →
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
