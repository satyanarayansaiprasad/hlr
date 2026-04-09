import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { allReviews, categoriesList, categoryMapping } from '../data/reviews';

const ReviewsList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(category || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveCategory(category || 'All');
  }, [category]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'All') {
      navigate('/reviews');
    } else {
      navigate(`/reviews/${catId}`);
    }
  };

  const filteredReviews = allReviews.filter((review) => {
    const matchesCategory = activeCategory === 'All' || review.categorySlug === activeCategory;
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         review.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentCategoryObj = activeCategory !== 'All' ? categoryMapping[activeCategory] : null;

  const heroData = activeCategory === 'All' 
    ? { 
        title: "Editorial & Clinical Reviews", 
        desc: "Exploring the intersection of medical science and lifestyle wellness. Our library of expert-vetted articles is here to guide your journey." 
      }
    : { 
        title: `${currentCategoryObj?.name || 'Category'} Reviews`, 
        desc: `Explore our clinically vetted reviews and deep dives about ${currentCategoryObj?.name || 'this category'}. We break down the science so you understand exactly what you're putting in your body.` 
      };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="max-w-4xl mb-16 px-4">
          <span className="text-[10px] font-bold text-[#0052CC] uppercase tracking-[0.2em] mb-4 block flex items-center gap-2">
            {currentCategoryObj && <i className={`${currentCategoryObj.icon} text-lg`}></i>}
            {activeCategory === 'All' ? 'The Knowledge Hub' : currentCategoryObj?.name}
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-[#191C1D] mb-8 leading-tight">
            {heroData.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            {heroData.desc}
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm mb-16 flex flex-col lg:flex-row gap-8 items-center border border-gray-100">
          <div className="flex flex-wrap gap-3 flex-grow">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeCategory === 'All' ? 'bg-[#003D9B] text-white shadow-lg shadow-[#003D9B]/20' : 'bg-[#F3F4F5] text-gray-500 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat.id ? 'bg-[#003D9B] text-white shadow-lg shadow-[#003D9B]/20' : 'bg-[#F3F4F5] text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="shrink-0 w-full lg:w-96 relative group">
            <input 
              type="text" 
              placeholder="Search library..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F3F4F5] p-5 pl-14 rounded-2xl outline-none focus:ring-4 focus:ring-[#0052CC]/5 text-gray-700 transition-all font-medium border-2 border-transparent focus:border-[#0052CC]/10"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 group-focus-within:text-[#0052CC] transition-colors">
              <i className="ri-search-2-line text-xl"></i>
            </div>
          </div>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <motion.div
                  layout
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))
            ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full py-32 text-center"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-gray-300">
                    <i className="ri-search-eye-line text-4xl"></i>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#191C1D] mb-2 leading-tight">No scientific match found</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">Try adjusting your filters or search keywords to find what you're looking for.</p>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination placeholder */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex justify-center">
           <div className="flex gap-4">
              <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#0052CC]/5 hover:text-[#0052CC] transition-all">
                <i className="ri-arrow-left-s-line"></i>
              </button>
              {[1, 2, 3].map(i => (
                <button key={i} className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${i === 1 ? 'bg-[#0052CC] text-white shadow-lg' : 'hover:bg-gray-100 text-gray-500'}`}>
                  {i}
                </button>
              ))}
              <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#0052CC]/5 hover:text-[#0052CC] transition-all">
                <i className="ri-arrow-right-s-line"></i>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsList;
