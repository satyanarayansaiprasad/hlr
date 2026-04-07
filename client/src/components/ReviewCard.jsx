import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ReviewCard = ({ review }) => {
  const { 
    id, 
    title, 
    author, 
    date, 
    category, 
    image, 
    excerpt, 
    slug 
  } = review;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="card group border border-gray-100 flex flex-col h-full overflow-hidden transition-all bg-white"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md text-[#191C1D] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
          {category}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 ring-2 ring-[#0052CC]/10">
            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#191C1D]">{author.name}</span>
            <span className="text-[10px] font-medium text-gray-400">{date}</span>
          </div>
        </div>

        <Link to={`/review/${slug}`} className="mb-4 block transition-colors hover:text-[#0052CC]">
          <h3 className="font-display font-bold text-2xl text-[#191C1D] leading-tight mb-3">
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </Link>

        <div className="mt-auto pt-6 border-t border-gray-50">
          <Link 
            to={`/review/${slug}`} 
            className="text-sm font-bold text-[#0052CC] hover:underline flex items-center justify-between group/link"
          >
            <span>Read full clinical review</span>
            <div className="w-8 h-8 rounded-full bg-[#0052CC]/5 flex items-center justify-center group-hover/link:bg-[#0052CC] group-hover/link:text-white transition-all">
              <i className="ri-arrow-right-line"></i>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
