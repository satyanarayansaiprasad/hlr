import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';
import CTASection from '../components/CTASection';

const Home = () => {
  const bestSellers = [
    {
      id: 1,
      name: "Solstice Nootropic Blend",
      category: "Brain Health",
      rating: 4.9,
      image: "/images/supplement.png",
      reviewUrl: "/review/solstice-nootropic",
      priceRange: "$45.00",
      features: ["Enhanced focus & clarity", "Clinically backed ingredients", "Non-GMO & Vegan"],
      isTopPick: true
    },
    {
      id: 2,
      name: "Aethel Radiance Serum",
      category: "Skincare",
      rating: 4.7,
      image: "/images/skincare.png",
      reviewUrl: "/review/aethel-radiance",
      priceRange: "$68.00",
      features: ["Hyaluronic Acid + Vitamin C", "Dermatologist tested", "Fragrance free"],
      isTopPick: false
    },
    {
      id: 3,
      name: "Deep Sleep Magnesium",
      category: "Sleep",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
      reviewUrl: "/review/deep-sleep-magnesium",
      priceRange: "$29.99",
      features: ["High bioavailability", "Stress reduction", "Natural ingredients"],
      isTopPick: false
    }
  ];

  const featuredReviews = [
    {
      id: 1,
      title: "The Science of Gut Health: Why Probiotics Matter",
      author: { name: "Dr. Sarah Miller", avatar: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=300" },
      date: "Oct 24, 2023",
      category: "Gut Health",
      image: "https://images.unsplash.com/photo-1626202346584-c77aa94969bb?auto=format&fit=crop&q=80&w=800",
      excerpt: "Explore the clinical data behind the microbiome and why high-quality probiotics are essential for modern metabolic health.",
      slug: "science-of-gut-health"
    },
    {
      id: 2,
      title: "Bioavailability Guide: How Supplements are Absorbed",
      author: { name: "Dr. James Chen", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" },
      date: "Oct 20, 2023",
      category: "Clinical Data",
      image: "https://images.unsplash.com/photo-1579154235828-401982c60461?auto=format&fit=crop&q=80&w=800",
      excerpt: "Not all supplements are created equal. We break down the science of delivery systems and how to ensure your body actually uses what you take.",
      slug: "bioavailability-guide"
    }
  ];

  const categories = [
    { name: 'Immunity', icon: 'ri-shield-flash-line', count: 24 },
    { name: 'Skincare', icon: 'ri-magic-line', count: 18 },
    { name: 'Sleep', icon: 'ri-moon-line', count: 12 },
    { name: 'Nootropics', icon: 'ri-brain-line', count: 15 },
    { name: 'Gut Health', icon: 'ri-microscope-line', count: 21 },
    { name: 'Fitness', icon: 'ri-heart-pulse-line', count: 32 }
  ];

  return (
    <div className="bg-[#F8F9FA]">
      {/* Blog Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0052CC]/5 to-transparent -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-[#0052CC] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">New Entry</span>
                <span className="text-gray-400 text-xs font-medium">Updated Oct 26, 2023</span>
              </div>
              <h1 className="font-display font-black text-5xl md:text-7xl text-[#191C1D] mb-8 leading-[1.1] tracking-tight">
                Editorial Health: <br />
                <span className="text-[#0052CC]">Clinical Precision</span> In Every Review.
              </h1>
              <p className="text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed">
                We dismantle the marketing hype to deliver science-based insights on the supplements and wellness tools that actually work. Expert verified, data driven.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link to="/blog" className="px-10 py-5 bg-[#0052CC] text-white rounded-2xl font-bold hover:bg-[#003D9B] transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3 group">
                  Explore Latest Reviews
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <div className="flex items-center gap-4 px-6 border-l border-gray-100">
                  <div className="flex -space-x-3">
                    {[
                      "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100",
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
                      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100"
                    ].map((src, i) => (
                      <img key={i} src={src} className="w-10 h-10 rounded-full border-2 border-white shadow-lg" alt="Doctor" />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#191C1D]">Medical Review Board</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">15+ PhD Experts</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl relative group">
                <img src="/images/hero.png" alt="Featured Article" className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#91F78E] mb-2">Featured Guide</p>
                  <h3 className="text-2xl font-display font-bold leading-tight">Finding Clinical Clarity in a Cluttered Market</h3>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#91F78E]/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-32 bg-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-[11px] font-bold text-[#0052CC] uppercase tracking-[0.3em] mb-4">The Best of 2023</h2>
            <h3 className="font-display font-bold text-4xl md:text-5xl text-[#191C1D] mb-6">Our Top Rated Best Sellers</h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">Products that have outperformed our clinical benchmarks and received exceptional community feedback.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-20 overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-sm">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-[#0052CC]/5 border-b border-gray-100">
                     <th className="px-10 py-6 text-xs font-bold text-[#191C1D] uppercase tracking-widest">Top Performers</th>
                     <th className="px-10 py-6 text-xs font-bold text-[#191C1D] uppercase tracking-widest">Scientific Score</th>
                     <th className="px-10 py-6 text-xs font-bold text-[#191C1D] uppercase tracking-widest">Key Advantage</th>
                     <th className="px-10 py-6 text-xs font-bold text-[#191C1D] uppercase tracking-widest text-right">Review Link</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50 transition-colors">
                       <td className="px-10 py-6 font-bold text-[#191C1D]">Solstice Nootropic</td>
                       <td className="px-10 py-6">
                         <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                               <div className="w-[98%] h-full bg-[#0052CC]"></div>
                            </div>
                            <span className="font-bold text-sm">9.8</span>
                         </div>
                       </td>
                       <td className="px-10 py-6 text-sm text-gray-500">Rapid metabolic activation</td>
                       <td className="px-10 py-6 text-right font-bold text-[#0052CC] text-xs uppercase tracking-widest hover:underline cursor-pointer">Read Deep Dive</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                       <td className="px-10 py-6 font-bold text-[#191C1D]">AG1 Athletic Greens</td>
                       <td className="px-10 py-6">
                         <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                               <div className="w-[94%] h-full bg-[#006E1C]"></div>
                            </div>
                            <span className="font-bold text-sm">9.4</span>
                         </div>
                       </td>
                       <td className="px-10 py-6 text-sm text-gray-500">Total metabolic foundational support</td>
                       <td className="px-10 py-6 text-right font-bold text-[#0052CC] text-xs uppercase tracking-widest hover:underline cursor-pointer">Read Deep Dive</td>
                    </tr>
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Blogging Layout */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
              {/* Main Content Area */}
              <div className="lg:col-span-3">
                 <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
                    <div>
                      <h2 className="font-display font-bold text-4xl text-[#191C1D] mb-2 leading-tight">Featured Clinical Insights</h2>
                      <p className="text-gray-400">Deep dives into the science of modern longevity.</p>
                    </div>
                    <Link to="/blog" className="text-xs font-bold text-[#0052CC] uppercase tracking-extra-wide hover:underline">Explore Library →</Link>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   {featuredReviews.map((review) => (
                     <ReviewCard key={review.id} review={review} />
                   ))}
                 </div>
              </div>

              {/* Sidebar Area */}
              <aside className="lg:col-span-1">
                 <div className="sticky top-24 flex flex-col gap-12">
                    {/* Category List */}
                    <div className="bg-[#F8F9FA] p-10 rounded-[32px] border border-gray-100 shadow-sm">
                       <h4 className="font-display font-bold text-xl text-[#191C1D] mb-8">Popular Verticals</h4>
                       <div className="flex flex-col gap-6">
                         {categories.map((cat, i) => (
                           <a key={i} href="#" className="flex items-center justify-between group">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0052CC] group-hover:bg-[#0052CC] group-hover:text-white transition-all shadow-sm">
                                  <i className={cat.icon}></i>
                                </div>
                                <span className="font-bold text-gray-500 group-hover:text-[#191C1D] transition-colors">{cat.name}</span>
                              </div>
                              <span className="text-[10px] font-bold text-gray-300 group-hover:text-[#0052CC] transition-colors">{cat.count}</span>
                           </a>
                         ))}
                       </div>
                    </div>

                    {/* Know Your Products Section */}
                    <div className="bg-[#191C1D] p-10 rounded-[32px] text-white shadow-2xl shadow-blue-900/10 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-[#91F78E]/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                       <h4 className="font-display font-bold text-2xl mb-4 leading-tight">Know About <br /> Your Products</h4>
                       <p className="text-sm text-gray-400 mb-8 leading-relaxed">Understanding the mechanisms of action before you invest in your health.</p>
                       <ul className="flex flex-col gap-5 mb-10">
                          <li className="flex items-center gap-3 text-xs font-bold text-[#91F78E]"><i className="ri-check-line"></i> Bioavailability Guide</li>
                          <li className="flex items-center gap-3 text-xs font-bold text-[#91F78E]"><i className="ri-check-line"></i> Toxicity Risk Analysis</li>
                          <li className="flex items-center gap-3 text-xs font-bold text-[#91F78E]"><i className="ri-check-line"></i> Batch Consistency Scores</li>
                       </ul>
                       <button className="w-full py-4 bg-[#0052CC] text-white rounded-xl font-bold text-sm tracking-wide">Enter the Hub</button>
                    </div>
                 </div>
              </aside>
           </div>
        </div>
      </section>

      {/* Trust Signal Section */}
      <section className="py-24 bg-[#EDEEEF]/50">
        <div className="container mx-auto px-4 text-center">
           <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-12">Referenced by Clinical Establishments</h4>
           <div className="flex flex-wrap justify-between items-center gap-10 opacity-30 px-10 grayscale">
              <span className="text-3xl font-display font-black">NEJM</span>
              <span className="text-3xl font-display font-black">THE LANCET</span>
              <span className="text-3xl font-display font-black">MAYOCLINIC</span>
              <span className="text-3xl font-display font-black">JOHNS HOPKINS</span>
              <span className="text-3xl font-display font-black">CLEVELAND</span>
           </div>
        </div>
      </section>

      {/* Newsletter */}
      <CTASection 
        title="Clinical Truth In Your Inbox"
        description="Join 45k+ monthly readers. Science-backed methodologies, zero noise. Just the facts on what moves the needle."
        buttonText="Subscribe to the Digest"
        variant="secondary"
      />
    </div>
  );
};

export default Home;
