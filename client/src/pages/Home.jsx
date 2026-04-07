import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRAND_NAME, BRAND_TAGLINE } from '../constants/brand';
import { CATEGORIES, PRODUCTS, REVIEWS } from '../data/siteData';
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* A. HERO SECTION */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-white border-b border-gray-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#0052CC]/5 to-transparent -z-10 blur-3xl"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-[#91F78E]/20 text-[#006E1C] px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 inline-block ring-1 ring-[#91F78E]/30">
              The Gold Standard
            </span>
            <h1 className="font-display font-black text-6xl md:text-8xl text-[#191C1D] mb-8 leading-tight tracking-tighter">
              {BRAND_NAME}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
              {BRAND_TAGLINE} <br /> 
              <span className="text-[#191C1D]/60 italic font-serif">Independent, clinical, and unapologetically honest.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-6">
               <Link to="/reviews" className="btn-primary py-5 px-12 text-lg shadow-2xl shadow-[#0052CC]/20 hover:scale-105 transition-all">
                  Deep Dive Reviews
               </Link>
               <button className="px-10 py-5 bg-[#F8F9FA] text-[#191C1D] rounded-2xl font-bold border border-gray-100 hover:bg-gray-100 transition-all text-lg">
                  Join 50k Readers
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* B. CATEGORY PREVIEW SECTIONS */}
      {CATEGORIES.slice(0, 3).map((category, idx) => {
        const categoryProducts = PRODUCTS.filter(p => p.category === category).slice(0, 3);
        if (categoryProducts.length === 0) return null;
        
        return (
          <section key={category} className={`py-32 ${idx % 2 === 1 ? 'bg-[#F8F9FA]' : 'bg-white'}`}>
             <div className="container mx-auto px-4 max-w-3xl">
                <div className="mb-20 text-center">
                   <p className="text-[10px] font-bold text-[#0052CC] uppercase tracking-[0.3em] mb-4">Editorial Spotlight</p>
                   <h2 className="font-display font-bold text-4xl md:text-5xl text-[#191C1D] mb-6 tracking-tight">{category}</h2>
                   <div className="w-20 h-1.5 bg-[#0052CC] mx-auto rounded-full"></div>
                </div>

                <div className="flex flex-col gap-16">
                   {categoryProducts.map((product) => (
                     <ProductCard key={product.id} product={product} />
                   ))}
                </div>

                <div className="mt-16 text-center">
                  <Link 
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 font-bold uppercase tracking-widest text-xs hover:text-[#0052CC] transition-colors"
                  >
                    View All {category} Reviews
                  </Link>
                </div>
             </div>
          </section>
        );
      })}

      {/* C. LATEST POSTS SECTION */}
      <section className="py-32 bg-[#191C1D] text-white">
         <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-24">
               <span className="text-[#91F78E] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Archive 2024</span>
               <h2 className="font-display font-bold text-5xl md:text-6xl tracking-tight">Recent Insights</h2>
            </div>

            <div className="flex flex-col gap-24">
               {REVIEWS.map((post) => (
                 <Link to={`/review/${post.slug}`} key={post.slug} className="group flex flex-col gap-10">
                    <div className="aspect-[2/1] rounded-[48px] overflow-hidden shadow-2xl relative">
                       <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#191C1D] via-transparent to-transparent"></div>
                       <div className="absolute bottom-10 left-10 right-10">
                          <span className="text-[#91F78E] text-[10px] font-bold uppercase tracking-widest mb-4 block">{post.category}</span>
                          <h3 className="font-display font-bold text-3xl md:text-4xl leading-tight group-hover:text-[#91F78E] transition-colors">{post.title}</h3>
                       </div>
                    </div>
                    <div className="px-4">
                       <p className="text-xl text-gray-400 leading-relaxed mb-6 group-hover:text-white/80 transition-colors">{post.excerpt}</p>
                       <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#0052CC]">
                          <span>Read Full Article</span>
                          <i className="ri-arrow-right-line group-hover:translate-x-3 transition-transform"></i>
                       </div>
                    </div>
                 </Link>
               ))}
            </div>

            <div className="mt-32 text-center">
               <Link to="/reviews" className="btn-primary py-6 px-16 text-xl rounded-full bg-white text-[#191C1D] hover:bg-[#91F78E] hover:text-[#006E1C] transition-all">
                  Browse Full Library
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
