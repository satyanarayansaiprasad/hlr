import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { 
    id, 
    name, 
    category, 
    rating, 
    image, 
    slug, 
    description,
    cta 
  } = product;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#0052CC]/5 transition-all group flex flex-col w-full max-w-3xl mx-auto"
    >
      <div className="aspect-video relative overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute top-8 left-8">
          <span className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl">
            Clinical Rating: {rating}
          </span>
        </div>
      </div>
      <div className="p-10 md:p-14 text-center">
        <span className="text-[#0052CC] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Independent Review</span>
        <h3 className="font-display font-bold text-3xl md:text-4xl mb-6 text-[#191C1D]">{name}</h3>
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-6 items-center">
          <Link to={`/review/${slug}`} className="btn-primary py-5 px-10 text-base font-bold flex items-center gap-3 transition-all hover:scale-105">
            Clinical Overview
            <i className="ri-arrow-right-line"></i>
          </Link>
          <a href={cta} className="text-gray-400 hover:text-[#0052CC] font-bold uppercase tracking-widest text-xs transition-colors">
            Official Website
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
