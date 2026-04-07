import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CommentSection from '../components/CommentSection';
import { REVIEWS, PRODUCTS } from '../data/siteData';

const ProductReview = () => {
  const { slug } = useParams();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    // Find the review by slug
    const data = REVIEWS.find(r => r.slug === slug);
    if (data) {
      // Mocking full details since we simplified siteData
      setReviewData({
        ...data,
        author: data.author || { name: 'Dr. Sarah Chen', avatar: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=300', bio: 'Clinical Nutritionist and Board-Certified Health Researcher with 15+ years of experience.' },
        pros: ['Clinically studied ingredients', 'Transparent manufacturing', 'Highly bioavailable formula'],
        cons: ['Premium pricing', 'Available online only', 'Occasional stock shortages'],
        product: {
          name: data.title.split(' Review:')[0],
          image: data.image,
          rating: 4.8,
          price: '$79.00',
          buyUrl: '#'
        },
        faqs: [
          { q: 'When will I see results?', a: 'Clinical data suggests most users notice significant cognitive improvements within 30-45 days of consistent use.' },
          { q: 'Is it safe long-term?', a: 'Yes, the formula is designed for sustained peak performance without cycles or crashes.' }
        ],
        comments: [
          { name: 'Dr. Michael Wright', date: '2 days ago', text: 'Excellent analysis of the clinical data. The bioavailability section is particularly enlightening.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300' }
        ]
      });
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!reviewData) return (
    <div className="pt-40 text-center min-h-screen bg-white">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full mb-8"></div>
        <div className="w-64 h-8 bg-gray-100 rounded-xl mb-4"></div>
        <div className="w-48 h-4 bg-gray-100 rounded-xl"></div>
      </div>
    </div>
  );

  const relatedProducts = PRODUCTS.filter(p => p.category === reviewData.category && p.slug !== slug).slice(0, 2);

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Reading Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#0052CC] origin-left z-[100]"
        style={{ scaleX }}
      />

      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-[#191C1D]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex items-center gap-8 md:gap-12 transition-all hover:scale-105">
        <a href="#overview" className="text-white/60 hover:text-[#91F78E] text-[10px] font-bold uppercase tracking-widest transition-colors">Overview</a>
        <a href="#proscons" className="text-white/60 hover:text-[#91F78E] text-[10px] font-bold uppercase tracking-widest transition-colors">Pros & Cons</a>
        <a href="#faq" className="text-white/60 hover:text-[#91F78E] text-[10px] font-bold uppercase tracking-widest transition-colors">FAQ</a>
      </nav>

      <main className="pt-32">
        <div className="container mx-auto px-4">
          <article className="max-w-[850px] mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 mb-12 overflow-x-auto whitespace-nowrap no-scrollbar">
              <Link to="/" className="text-xs font-bold text-gray-400 hover:text-[#0052CC] transition-colors">Home</Link>
              <i className="ri-arrow-right-s-line text-gray-300"></i>
              <Link to="/reviews" className="text-xs font-bold text-gray-400 hover:text-[#0052CC] transition-colors">Reviews</Link>
              <i className="ri-arrow-right-s-line text-gray-300"></i>
              <span className="text-xs font-bold text-[#191C1D]">{reviewData.title}</span>
            </div>

            {/* Hero Header */}
            <header className="mb-20">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
               >
                 <span className="bg-[#0052CC]/5 text-[#0052CC] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 inline-block ring-1 ring-[#0052CC]/10">
                   {reviewData.category} Review
                 </span>
                 <h1 className="font-display font-black text-5xl md:text-7xl text-[#191C1D] leading-[1.1] tracking-tight mb-12">
                   {reviewData.title}
                 </h1>
                 
                 <div className="flex flex-wrap items-center gap-8 py-8 border-y border-gray-50 mb-16">
                    <div className="flex items-center gap-4">
                       <img src={reviewData.author.avatar} alt={reviewData.author.name} className="w-12 h-12 rounded-full border-2 border-white shadow-xl" />
                       <div>
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Expert Analysis By</p>
                          <p className="font-bold text-[#191C1D]">{reviewData.author.name}</p>
                       </div>
                    </div>
                    <div className="h-8 w-px bg-gray-100"></div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Review Date</p>
                       <p className="font-bold text-[#191C1D]">{reviewData.date}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-100"></div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Medical Status</p>
                       <p className="font-bold text-[#006E1C] flex items-center gap-1.5">
                          <i className="ri-shield-check-fill"></i>
                          Clinical Verified
                       </p>
                    </div>
                 </div>
               </motion.div>
            </header>

            {/* Featured Image */}
            <section className="mb-24 rounded-[48px] overflow-hidden shadow-2xl relative group">
               <img src={reviewData.image} alt={reviewData.title} className="w-full aspect-[16/10] object-cover transition-transform duration-[6000ms] group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#191C1D]/20 to-transparent"></div>
            </section>

            {/* Content / Review Overview */}
            <section id="overview" className="prose prose-2xl prose-slate max-w-none mb-32">
              <div className="mb-16">
                <p className="text-2xl font-serif text-gray-600 leading-relaxed italic border-l-4 border-[#0052CC] pl-8">
                  {reviewData.excerpt}
                </p>
              </div>

              <div className="text-gray-500 font-medium leading-relaxed space-y-12 mb-20 text-xl">
                <p>
                  In our ongoing pursuit of peak human performance, we've encountered dozens of formulations promising revolutionary breakthroughs. However, few survive the rigorous scrutiny of our clinical review process. Today, we're dissecting {reviewData.product.name} to determine if it truly sets the standard in {reviewData.category.toLowerCase()} health.
                </p>
                
                <h3 className="font-display font-black text-4xl text-[#191C1D] mt-24 mb-10">Clinical Foundations</h3>
                <p>
                  Our research team spent 45 days analyzing the raw ingredient specifications and third-party laboratory results provided by the manufacturer. What we found was a formula focused on high bioavailability and pharmaceutical-grade purity.
                </p>

                <div className="grid grid-cols-1 gap-8 mt-12">
                  {['Science Behind the Supplement', 'Clinical Efficacy Results', 'Safety and Purity Testing'].map((item, idx) => (
                    <div key={idx} className="bg-[#F8F9FA] p-10 rounded-3xl group cursor-pointer hover:bg-white border border-transparent hover:border-gray-100 transition-all shadow-sm hover:shadow-xl">
                       <div className="flex gap-8 items-center">
                         <span className="text-4xl font-black text-gray-200 group-hover:text-[#0052CC] transition-colors">0{idx+1}</span>
                         <h4 className="font-display font-bold text-2xl text-[#191C1D]">{item}</h4>
                         <i className="ri-arrow-right-line ml-auto text-2xl text-gray-300 group-hover:text-[#0052CC] group-hover:translate-x-2 transition-all"></i>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Pros & Cons Section - Editorial Style */}
            <section id="proscons" className="mb-32 pt-24 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 <div>
                    <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3 text-[#006E1C]">
                      <i className="ri-checkbox-circle-line"></i>
                      The Clinical Pros
                    </h3>
                    <ul className="space-y-6">
                      {reviewData.pros.map((pro, i) => (
                        <li key={i} className="flex gap-4 text-gray-600 font-medium text-lg leading-snug">
                          <span className="w-1.5 h-1.5 bg-[#006E1C] rounded-full mt-2.5 flex-shrink-0"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div>
                    <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3 text-red-600">
                      <i className="ri-close-circle-line"></i>
                      Important Cons
                    </h3>
                    <ul className="space-y-6">
                      {reviewData.cons.map((con, i) => (
                        <li key={i} className="flex gap-4 text-gray-400 font-medium text-lg leading-snug">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2.5 flex-shrink-0"></span>
                          {con}
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>
            </section>

            {/* Product Card Callout / CTA Button */}
            <section className="mb-32">
               <div className="bg-[#191C1D] rounded-[40px] p-12 md:p-16 text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#0052CC]/20 rounded-full blur-[100px] -z-0"></div>
                  <div className="w-full md:w-1/3 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                     <img src={reviewData.product.image} alt={reviewData.product.name} className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110" />
                  </div>
                  <div className="w-full md:w-2/3 relative z-10">
                     <span className="text-[#91F78E] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Editorial Choice 2024</span>
                     <h3 className="font-display font-black text-4xl mb-6">{reviewData.product.name}</h3>
                     <div className="flex items-center gap-2 mb-8 bg-white/5 w-fit px-4 py-2 rounded-xl">
                        <div className="flex">
                           {[1, 2, 3, 4, 5].map(i => <i key={i} className="ri-star-fill text-[#91F78E] text-sm"></i>)}
                        </div>
                        <span className="text-xs font-bold">{reviewData.product.rating} / 5.0 Rating</span>
                     </div>
                     <p className="text-gray-400 text-lg mb-10 leading-relaxed">The benchmark for clinical effectiveness within the {reviewData.category} sector. Verified by our PhD-led medical review board.</p>
                     <div className="flex flex-wrap gap-4">
                        <a href={reviewData.product.buyUrl} className="px-10 py-5 bg-[#0052CC] text-white rounded-2xl font-bold hover:bg-white hover:text-[#191C1D] transition-all flex items-center gap-3 text-lg">
                           Start Your Transformation
                           <i className="ri-external-link-line"></i>
                        </a>
                        <span className="text-2xl font-black self-center">{reviewData.product.price}</span>
                     </div>
                  </div>
               </div>
            </section>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <section className="mb-32 pt-24 border-t border-gray-100">
                <div className="text-center mb-16">
                  <span className="text-[10px] font-bold text-[#0052CC] uppercase tracking-[0.3em] mb-4 block">Recommended Insights</span>
                  <h2 className="font-display font-bold text-4xl text-[#191C1D]">Related Solutions</h2>
                </div>
                <div className="flex flex-col gap-12">
                  {relatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            <section id="faq" className="mb-32">
              <h2 className="font-display font-bold text-4xl text-[#191C1D] mb-12">Expert Answers</h2>
              <div className="space-y-8">
                {reviewData.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-8 last:border-0 group cursor-help">
                     <h5 className="font-bold text-2xl text-[#191C1D] mb-4 flex gap-4 transition-colors group-hover:text-[#0052CC]">
                       <span className="text-[#0052CC] opacity-20">Q.</span>
                       {faq.q}
                     </h5>
                     <p className="text-gray-500 text-lg leading-relaxed pl-10 font-medium italic">
                       {faq.a}
                     </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Author Footer Card */}
            <section className="mb-32 pt-24 border-t border-gray-100">
               <div className="bg-[#F8F9FA] rounded-[32px] p-10 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-10">
                     <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl flex-shrink-0">
                        <img src={reviewData.author.avatar} alt={reviewData.author.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="text-center md:text-left">
                        <p className="text-[10px] font-bold text-[#0052CC] uppercase tracking-[0.2em] mb-2">About the Author</p>
                        <h4 className="font-display font-bold text-3xl text-[#191C1D] mb-4">{reviewData.author.name}</h4>
                        <p className="text-lg text-gray-500 leading-relaxed mb-6">{reviewData.author.bio}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                           {['Board Certified', 'PhD Research', 'Editorial Lead'].map((spec, i) => (
                              <span key={i} className="bg-white px-4 py-2 rounded-full text-xs font-bold text-gray-400 border border-gray-100 uppercase tracking-widest">{spec}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Discussion Section */}
            <section className="pb-32">
              <CommentSection comments={reviewData.comments} />
            </section>
          </article>
        </div>
      </main>
    </div>
  );
};

export default ProductReview;
