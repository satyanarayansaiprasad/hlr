import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewCard from '../components/ReviewCard';

const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Supplements', 'Gut Health', 'Sleep Science', 'Wellness Tech', 'Mental Health', 'Digital Health'];

  const allReviews = [
    {
      id: 1,
      title: "Is Magnesium Glycinate the Key to Better Sleep?",
      author: { name: "Dr. Sarah Chen", avatar: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=300" },
      date: "Oct 12, 2023",
      category: "Sleep Science",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
      excerpt: "Magnesium glycinate is frequently recommended for its high bioavailability and calming effects on the nervous system. We tested 15 brands to find the purest formulations.",
      slug: "magnesium-glycinate-sleep"
    },
    {
      id: 2,
      title: "The Truth About Intermittent Fasting Apps",
      author: { name: "Marcus Thorne", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300" },
      date: "Oct 10, 2023",
      category: "Digital Health",
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800",
      excerpt: "Can an app really help you reach your fasting goals? We reviewed the top 5 fasting trackers based on usability, scientific accuracy, and community support.",
      slug: "fasting-apps-review"
    },
    {
      id: 3,
      title: "Red Light Therapy: Fad or Clinical Breakthrough?",
      author: { name: "Dr. Elena Rossi", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" },
      date: "Oct 08, 2023",
      category: "Wellness Tech",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
      excerpt: "Photobiomodulation has gained massive popularity in the fitness community. We analyzed clinical trials to determine if at-home devices actually work.",
      slug: "red-light-therapy-truth"
    },
    {
      id: 4,
      title: "Omega-3 vs. Omega-6: Balancing Your Fatty Acid Intake",
      author: { name: "James Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
      date: "Oct 05, 2023",
      category: "Supplements",
      image: "https://images.unsplash.com/photo-1445108849639-1e24ede7a38a?auto=format&fit=crop&q=80&w=800",
      excerpt: "Most modern diets are heavily skewed towards Omega-6. We break down why this matters for inflammation and how to rebalance your ratio.",
      slug: "omega-fatty-acids-balance"
    },
    {
      id: 5,
      title: "Microbiome 101: Understanding Your Gut Flora",
      author: { name: "Dr. Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah" },
      date: "Oct 02, 2023",
      category: "Gut Health",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
      excerpt: "Your gut is home to trillions of bacteria. Discover how these microsopic residents influence everything from your immune system to your mood.",
      slug: "microbiome-gut-health"
    },
    {
      id: 6,
      title: "The Effects of Blue Light on Cortisol Levels",
      author: { name: "Dr. Elena Rossi", avatar: "https://i.pravatar.cc/150?u=elena" },
      date: "Sep 28, 2023",
      category: "Sleep Science",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
      excerpt: "Late-night screen use doesn't just disrupt melatonin—it can also spike your stress hormones. Our latest study reveals surprising findings.",
      slug: "blue-light-cortisol"
    }
  ];

  const filteredReviews = allReviews.filter((review) => {
    const matchesCategory = activeCategory === 'All' || review.category === activeCategory;
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         review.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="max-w-4xl mb-16 px-4">
          <span className="text-[10px] font-bold text-[#0052CC] uppercase tracking-[0.2em] mb-4 block">The Knowledge Hub</span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-[#191C1D] mb-8 leading-tight">Editorial & Clinical <br /> Reviews</h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Exploring the intersection of medical science and lifestyle wellness. Our library of <span className="text-[#191C1D] font-bold">150+ expert-vetted articles</span> is here to guide your journey.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm mb-16 flex flex-col lg:flex-row gap-8 items-center border border-gray-100">
          <div className="flex flex-wrap gap-3 flex-grow">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat ? 'bg-[#003D9B] text-white shadow-lg shadow-[#003D9B]/20' : 'bg-[#F3F4F5] text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat}
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

export default BlogList;
