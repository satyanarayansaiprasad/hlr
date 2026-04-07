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
    reviewUrl, 
    priceRange, 
    features, 
    isTopPick 
  } = product;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`card border ${isTopPick ? 'border-[#0052CC] ring-1 ring-[#0052CC]/10' : 'border-gray-100'}`}
    >
      <div className="relative aspect-video overflow-hidden">
        {isTopPick && (
          <div className="absolute top-4 left-4 z-10 bg-[#0052CC] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
            Editor's Choice
          </div>
        )}
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191C1D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-[10px] font-bold text-[#006E1C] uppercase tracking-[0.08em] mb-1 block">
              {category}
            </span>
            <h3 className="font-display font-bold text-lg text-[#191C1D] mb-1 group-hover:text-[#0052CC] transition-colors leading-tight">
              {name}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 bg-[#91F78E]/10 px-2 py-1 rounded-lg">
            <i className="ri-star-fill text-[#006E1C] text-sm"></i>
            <span className="font-bold text-sm text-[#006E1C]">{rating}</span>
          </div>
        </div>

        <ul className="mb-6 space-y-2">
          {features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
              <i className="ri-checkbox-circle-fill text-[#006E1C] text-sm opacity-60"></i>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
          <span className="font-display font-bold text-lg text-[#191C1D]">
            {priceRange}
          </span>
          <Link 
            to={reviewUrl} 
            className="text-sm font-bold text-[#0052CC] hover:underline flex items-center gap-1 group/link"
          >
            Read Review
            <i className="ri-arrow-right-line group-hover/link:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
