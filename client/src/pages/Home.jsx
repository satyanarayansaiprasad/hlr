import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRAND_NAME, BRAND_TAGLINE } from '../constants/brand';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';
import CTASection from '../components/CTASection';
import { allReviews, categories } from '../data/reviews';

const Home = () => {
  // Focus on top categories for homepage
  const mainCategories = ["Weight Loss", "Dental Health", "Beauty", "Men's Health"];

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-44 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0052CC]/5 to-transparent -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-12 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="bg-[#0052CC] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Editorial Authority</span>
                <span className="text-gray-400 text-xs font-medium">Updated 2024</span>
              </div>
              <h1 className="font-display font-black text-6xl md:text-8xl text-[#191C1D] mb-8 leading-[1] tracking-tighter">
                {BRAND_NAME}<br />
                <span className="text-[#0052CC]">{BRAND_TAGLINE.split('.')[0]}</span>
              </h1>
              <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Expert-vetted clinical reviews for high-performance living. We dismantle the hype to help you choose what actually works for your health journey.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <Link to="/reviews" className="px-12 py-5 bg-[#0052CC] text-white rounded-2xl font-bold hover:bg-[#003D9B] transition-all shadow-2xl shadow-blue-600/20 flex items-center gap-3 group text-lg">
                  Explore Latest Reviews
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <div className="flex items-center gap-4 px-8 border-l border-gray-100">
                  <div className="flex -space-x-4">
                    {["https://images.unsplash.com/photo-1559839734-2b71f1536783?w=100", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"].map((img, i) => (
                      <img key={i} src={img} alt="Expert" className="w-12 h-12 rounded-full border-4 border-white shadow-md relative z-10" />
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#191C1D]">50k+ Readers</p>
                    <p className="text-[10px] uppercase font-bold text-gray-300 tracking-widest">Trust Our Research</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Horizontal Scroll Section */}
      <section className="py-20 -mt-20">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-4 pb-8 no-scrollbar scroll-smooth">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to={`/reviews?category=${cat}`}
                className="whitespace-nowrap px-8 py-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#0052CC]/10 hover:-translate-y-1 transition-all font-bold text-[#191C1D] text-sm uppercase tracking-widest flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 bg-[#0052CC] rounded-full"></span>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Category Sections */}
      {mainCategories.map((mainCat, idx) => (
        <section key={mainCat} className={`py-32 ${idx % 2 === 0 ? 'bg-[#F8F9FA]' : 'bg-white'}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-16 px-4">
              <div className="max-w-2xl">
                <span className="text-[10px] font-bold text-[#0052CC] uppercase tracking-[0.3em] mb-4 block">Certified Clinical Focus</span>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-[#191C1D] tracking-tight">{mainCat} Reviews</h2>
              </div>
              <Link to={`/reviews?category=${mainCat}`} className="flex items-center gap-2 text-sm font-bold text-[#0052CC] hover:underline uppercase tracking-widest">
                See All
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {allReviews
                .filter(r => r.category === mainCat)
                .slice(0, 3)
                .map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
            </div>
          </div>
        </section>
      ))}

      {/* Latest Articles Feed */}
      <section className="py-32 bg-[#191C1D] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="font-display font-bold text-5xl mb-6">Latest Post Insights</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto italic">Science doesn't sleep. Here's our latest editorial research into modern wellness.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {allReviews.slice(0, 3).map((review) => (
              <Link 
                key={review.id} 
                to={`/review/${review.slug}`} 
                className="group flex flex-col gap-8 bg-white/5 p-10 rounded-[32px] border border-white/10 hover:border-[#0052CC]/30 transition-all hover:-translate-y-2"
              >
                <div className="aspect-video rounded-2xl overflow-hidden relative">
                   <img src={review.image} alt={review.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                   <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">{review.category}</div>
                </div>
                <div>
                   <h3 className="font-display font-bold text-2xl mb-4 group-hover:text-[#91F78E] transition-colors">{review.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">{review.excerpt}</p>
                   <span className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                      Read Full Exposure
                      <i className="ri-arrow-right-line text-[#91F78E]"></i>
                   </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link to="/reviews" className="px-12 py-5 border-2 border-[#0052CC] text-white rounded-2xl font-bold hover:bg-[#0052CC] transition-all inline-flex items-center gap-3">
              See All Posts Library
              <i className="ri-layout-grid-line"></i>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Home;
