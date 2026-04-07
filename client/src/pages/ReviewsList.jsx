import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { allReviews, categories } from '../data/reviews';

const ReviewsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    setActiveCategory(cat);
  }, [searchParams]);

  const allCategories = ['All', ...categories];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredReviews = allReviews.filter((review) => {
    const matchesCategory = activeCategory === 'All' || review.category === activeCategory;
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         review.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-40 pb-40">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="max-w-4xl mb-24 px-4 text-center mx-auto">
          <span className="text-[12px] font-black text-[#0052CC] uppercase tracking-[0.4em] mb-6 block">Clinical Intelligence Hub</span>
          <h1 className="font-display font-black text-6xl md:text-8xl text-[#191C1D] mb-10 leading-[0.9] tracking-tighter">
            Editorial <br /> 
            <span className="text-[#0052CC]/10 decoration-[#0052CC] underline decoration-4 underline-offset-[16px]">Expert Library</span>
          </h1>
          <p className="text-2xl text-gray-400 max-w-3xl leading-relaxed mx-auto italic">
            Dismantling health marketing since 2024. Your clinical guide to the supplement landscape.
          </p>
        </div>

        {/* Dynamic Filters & Search */}
        <div className="bg-white p-12 rounded-[48px] shadow-2xl shadow-blue-900/5 mb-24 flex flex-col gap-12 border border-gray-50/50">
          <div className="flex flex-wrap gap-4 justify-center">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#0052CC] text-white shadow-xl shadow-blue-600/30 -translate-y-1' 
                    : 'bg-[#F8F9FA] text-gray-400 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative group max-w-2xl mx-auto w-full">
            <input 
              type="text" 
              placeholder="Search clinical library by name or condition..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F3F4F5] p-6 pl-16 rounded-3xl outline-none focus:ring-8 focus:ring-[#0052CC]/5 text-gray-700 transition-all font-bold text-xl placeholder:text-gray-300 border-2 border-transparent focus:border-[#0052CC]/10 shadow-inner"
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0052CC] transition-colors">
              <i className="ri-search-2-line text-3xl"></i>
            </div>
          </div>
        </div>

        {/* Full-width Clean Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 px-4 lg:px-0">
          <AnimatePresence mode="popLayout">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <motion.div
                  layout
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))
            ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full py-40 text-center"
                >
                  <div className="w-32 h-32 bg-[#F3F4F5] rounded-[40px] flex items-center justify-center mx-auto mb-10 text-gray-200">
                    <i className="ri-microscope-line text-5xl"></i>
                  </div>
                  <h3 className="font-display font-black text-3xl text-[#191C1D] mb-4">No Clinical Data Found</h3>
                  <p className="text-gray-400 text-xl max-w-sm mx-auto italic font-medium">We haven't reviewed this product or category yet. Adjust your search parameters or check back soon.</p>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Pagination Info */}
        <div className="mt-40 pt-20 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
           <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Showing {filteredReviews.length} Scientific Matches</p>
           <div className="flex gap-4">
              <button className="px-8 py-4 rounded-xl border border-gray-100 text-xs font-bold uppercase tracking-widest hover:bg-[#0052CC] hover:text-white transition-all shadow-sm">
                Request a Review
              </button>
              <button className="px-10 py-4 bg-[#191C1D] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-2xl transition-all">
                Load More Archive
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsList;
