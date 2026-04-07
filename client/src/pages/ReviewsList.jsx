import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { REVIEWS, CATEGORIES } from '../data/siteData';

const ReviewsList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterCategories = ['All', ...CATEGORIES];

  const filteredReviews = REVIEWS.filter((review) => {
    const matchesCategory = activeCategory === 'All' || review.category === activeCategory;
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         review.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-4 max-w-[850px]">
        {/* Page Header */}
        <div className="mb-24 text-center">
          <span className="text-[10px] font-bold text-[#0052CC] uppercase tracking-[0.4em] mb-4 block">Archive 2024</span>
          <h1 className="font-display font-black text-6xl md:text-7xl text-[#191C1D] mb-8 leading-tight tracking-tight">Editorial Hub</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed italic font-serif">
            Dismantling marketing hype to deliver science-based insights on supplements that actually work.
          </p>
        </div>

        {/* Filters & Search - Stacked Vertical */}
        <div className="mb-24 space-y-8">
           <div className="relative group">
              <input 
                type="text" 
                placeholder="Search the clinical archive..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F9FA] p-8 pl-16 rounded-[32px] outline-none focus:ring-4 focus:ring-[#0052CC]/5 text-gray-700 transition-all font-medium border-2 border-transparent focus:border-[#0052CC]/10 text-xl"
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0052CC] transition-colors">
                <i className="ri-search-2-line text-2xl"></i>
              </div>
           </div>

           <div className="flex flex-wrap justify-center gap-3">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat ? 'bg-[#191C1D] text-white shadow-xl shadow-black/10' : 'bg-[#F8F9FA] text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Review List - Vertical Stacked */}
        <div className="flex flex-col gap-24">
          <AnimatePresence mode="popLayout">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((post) => (
                <motion.div
                  layout
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="group"
                >
                  <Link to={`/review/${post.slug}`} className="flex flex-col gap-10">
                    <div className="aspect-[16/9] rounded-[48px] overflow-hidden shadow-2xl relative">
                       <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6000ms]" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#191C1D]/40 via-transparent to-transparent"></div>
                       <div className="absolute bottom-8 left-8 right-8">
                          <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-2 block">{post.category}</span>
                          <h3 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight group-hover:text-white transition-colors">{post.title}</h3>
                       </div>
                    </div>
                    <div className="px-4">
                       <div className="flex items-center gap-6 mb-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
                          <span>{post.author.name}</span>
                          <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                          <span>{post.date}</span>
                       </div>
                       <p className="text-xl text-gray-400 leading-relaxed mb-8 group-hover:text-gray-600 transition-colors">{post.excerpt}</p>
                       <div className="flex items-center gap-3 text-[#0052CC] font-bold text-xs uppercase tracking-widest">
                          <span>Clinical Deep Dive</span>
                          <i className="ri-arrow-right-line group-hover:translate-x-3 transition-transform"></i>
                       </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
                <div className="py-40 text-center">
                  <i className="ri-search-eye-line text-6xl text-gray-100 mb-8 block"></i>
                  <h3 className="font-display font-bold text-3xl text-[#191C1D] mb-4">No scientific match found</h3>
                  <p className="text-gray-400 text-lg">Try adjusting your filters or search keywords.</p>
                </div>
            )}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {filteredReviews.length > 0 && (
           <div className="mt-32 text-center">
              <button className="px-12 py-6 bg-[#F8F9FA] text-gray-400 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#191C1D] hover:text-white transition-all">
                 Load Full Archive
              </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
